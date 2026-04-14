import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  // Default to a smooth slide-up effect, easily overridden via Inputs
  @Input() hiddenClasses: string[] = ['opacity-0', 'translate-y-12'];
  @Input() visibleClasses: string[] = ['opacity-100', 'translate-y-0'];
  @Input() transitionClasses: string[] = ['transition-all', 'duration-700', 'ease-out'];
  @Input() threshold: number = 0.1;

  ngOnInit(): void {
    this.initializeStyles();
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  /**
   * Sets the initial "invisible" state of the element
   */
  private initializeStyles(): void {
    const element = this.el.nativeElement;
    [...this.transitionClasses, ...this.hiddenClasses].forEach((cls) => {
      this.renderer.addClass(element, cls);
    });
  }

  /**
   * Configures the observer to watch for scroll entry
   */
  private setupIntersectionObserver(): void {
    const element = this.el.nativeElement;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.revealElement(element, observer);
          }
        });
      },
      {
        threshold: this.threshold,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    observer.observe(element);

    // Ensure we stop watching if the component is destroyed
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  /**
   * Swaps CSS classes to trigger the animation
   */
  private revealElement(element: HTMLElement, observer: IntersectionObserver): void {
    // Remove "Hidden" classes, add "Visible" classes
    this.hiddenClasses.forEach((cls) => this.renderer.removeClass(element, cls));
    this.visibleClasses.forEach((cls) => this.renderer.addClass(element, cls));

    // Efficiency: Stop watching this element once it's visible
    observer.unobserve(element);
  }
}
