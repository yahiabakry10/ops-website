import { Component, inject, OnInit, PLATFORM_ID, Renderer2, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Language } from '../../../../../types/language.interface';

@Component({
  selector: 'app-language',
  standalone: true,
  templateUrl: './language.component.html',
})
export class LanguageComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
  ];

  // Initialize with English, then update in ngOnInit
  readonly selectedLanguage = signal<Language>(this.languages[0]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initLanguage();
    }
  }

  toggleLanguage(): void {
    const nextLang = this.selectedLanguage().code === 'en' ? this.languages[1] : this.languages[0];
    this.updateLanguageState(nextLang);
  }

  private initLanguage(): void {
    const savedCode = localStorage.getItem('lang') || this.translate.getBrowserLang() || 'en';
    const initialLang = this.languages.find((l) => l.code === savedCode) || this.languages[0];
    this.updateLanguageState(initialLang);
  }

  private updateLanguageState(lang: Language): void {
    this.selectedLanguage.set(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang.code);

      // Update Library
      this.translate.use(lang.code);

      // Update DOM (Best practice: handle inside requestAnimationFrame to avoid layout jank)
      requestAnimationFrame(() => {
        const isAr = lang.code === 'ar';
        const html = document.documentElement;

        this.renderer.setAttribute(html, 'lang', lang.code);
        this.renderer.setAttribute(html, 'dir', isAr ? 'rtl' : 'ltr');

        // Optional: Add a class for specific CSS overrides
        if (isAr) {
          this.renderer.addClass(html, 'is-rtl');
        } else {
          this.renderer.removeClass(html, 'is-rtl');
        }
      });
    }
  }
}
