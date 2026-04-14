import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface HexNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, TranslatePipe, ScrollRevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private ctx!: CanvasRenderingContext2D;
  private animFrameId = 0;
  private nodes: HexNode[] = [];
  private resizeObserver!: ResizeObserver;
  private intersectionObserver!: IntersectionObserver;

  // Stored dimensions to prevent Layout Thrashing in the animation loop
  private logicalWidth = 0;
  private logicalHeight = 0;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Wrap in a tiny timeout to ensure the DOM has painted the new Navbar
      // and the Hero container has its true height.
      setTimeout(() => {
        if (window.innerWidth < 768) return;

        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d', { alpha: true })!;

        this.fitCanvas();
        this.buildNodes();

        this.resizeObserver = new ResizeObserver(() => {
          this.fitCanvas();
          this.buildNodes();
        });

        this.resizeObserver.observe(canvas.parentElement!);

        this.intersectionObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            if (!this.animFrameId) {
              this.ngZone.runOutsideAngular(() => this.animate());
            }
          } else {
            if (this.animFrameId) {
              cancelAnimationFrame(this.animFrameId);
              this.animFrameId = 0;
            }
          }
        });
        this.intersectionObserver.observe(canvas.parentElement!);
      }, 50);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
      }
      this.resizeObserver?.disconnect();
      this.intersectionObserver?.disconnect();
    }
  }

  private fitCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    const dpr = window.devicePixelRatio || 1;

    // Only update if size actually changed to prevent infinite resize loops
    if (this.logicalWidth === parent.offsetWidth && this.logicalHeight === parent.offsetHeight) {
      return;
    }

    this.logicalWidth = parent.offsetWidth;
    this.logicalHeight = parent.offsetHeight;

    canvas.width = this.logicalWidth * dpr;
    canvas.height = this.logicalHeight * dpr;
    canvas.style.width = `${this.logicalWidth}px`;
    canvas.style.height = `${this.logicalHeight}px`;

    this.ctx.scale(dpr, dpr);
  }

  private buildNodes(): void {
    const count = Math.round((this.logicalWidth * this.logicalHeight) / 22_000);

    this.nodes = Array.from({ length: count }, () => ({
      x: Math.random() * this.logicalWidth,
      y: Math.random() * this.logicalHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 3 + Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.4,
    }));
  }

  private animate(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Use stored logical dimensions for logic wrapping
    const w = this.logicalWidth;
    const h = this.logicalHeight;

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.globalCompositeOperation = 'lighter';

    // 1. Move nodes
    for (const n of this.nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0) n.x = w;
      if (n.x > w) n.x = 0;
      if (n.y < 0) n.y = h;
      if (n.y > h) n.y = 0;
    }

    // 2. Draw connecting lines (Optimized with squared distance)
    const CONNECTION_DIST = 130;
    const DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;

    this.ctx.lineWidth = 1.0;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dSq = dx * dx + dy * dy;

        if (dSq < DIST_SQ) {
          const dist = Math.sqrt(dSq);
          const alpha = (1 - dist / CONNECTION_DIST) * 0.3;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    }

    // 3. Draw nodes
    for (const n of this.nodes) {
      this.drawHex(n.x, n.y, n.radius, n.opacity);
    }

    // 4. Draw pulse line
    this.drawPulseLine(w, h);

    this.animFrameId = requestAnimationFrame(() => this.animate());
  }

  private drawHex(x: number, y: number, r: number, opacity: number): void {
    // High-performance Glow: draw a larger faint hex instead of shadowBlur
    const angles = [0, 1, 2, 3, 4, 5].map((i) => (Math.PI / 3) * i - Math.PI / 6);

    // Faint Glow Layer
    this.ctx.beginPath();
    const glowR = r * 1.8;
    angles.forEach((angle, i) => {
      const px = x + glowR * Math.cos(angle);
      const py = y + glowR * Math.sin(angle);
      i === 0 ? this.ctx.moveTo(px, py) : this.ctx.lineTo(px, py);
    });
    this.ctx.closePath();
    this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
    this.ctx.fill();

    // Sharp Main Layer
    this.ctx.beginPath();
    angles.forEach((angle, i) => {
      const px = x + r * Math.cos(angle);
      const py = y + r * Math.sin(angle);
      i === 0 ? this.ctx.moveTo(px, py) : this.ctx.lineTo(px, py);
    });
    this.ctx.closePath();
    this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
    this.ctx.fill();
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity + 0.4})`;
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
  }

  private pulseOffset = 0;
  private drawPulseLine(width: number, height: number): void {
    this.pulseOffset = (this.pulseOffset + 0.5) % width;
    const baseY = height * 0.72;
    const amplitude = height * 0.045;
    const period = width / 3;

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.lineWidth = 2;

    for (let x = 0; x <= width; x += 3) {
      const phase = ((x + this.pulseOffset) % period) / period;
      let y = baseY;

      if (phase < 0.04) y = baseY - amplitude * (phase / 0.04);
      else if (phase < 0.06) y = baseY - amplitude + amplitude * ((phase - 0.04) / 0.02);
      else if (phase < 0.08) y = baseY + amplitude * 0.4 * ((phase - 0.06) / 0.02);
      else if (phase < 0.1) y = baseY + amplitude * 0.4 * (1 - (phase - 0.08) / 0.02);

      x === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
  }

  // scroll to content
  scrollToContent(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  }
}
