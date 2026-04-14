import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, Renderer2, signal } from '@angular/core';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
})
export class ThemeComponent implements OnInit {
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isDarkMode = signal<boolean>(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.applyStoredOrSystemTheme();
    }
  }

  toggleTheme(): void {
    const newMode = !this.isDarkMode();
    this.isDarkMode.set(newMode);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      this.applyTheme(newMode);
    }
  }

  private applyStoredOrSystemTheme(): void {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored ? stored === 'dark' : prefersDark;

    this.isDarkMode.set(shouldBeDark);
    this.applyTheme(shouldBeDark);
  }

  private applyTheme(dark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    requestAnimationFrame(() => {
      if (dark) {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
    });
  }
}
