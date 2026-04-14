import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { LanguageComponent } from './components/language/language.component';
import { ThemeComponent } from './components/theme/theme.component';

// --- Types ---

interface NavItem {
  key: string;
  routerLink: string;
}

// --- Component ---

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LanguageComponent,
    ThemeComponent,
    TranslatePipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  private scrollListener!: () => void;

  // --- State ---

  readonly isScrolled = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);

  // --- Nav Items ---

  readonly navItems: NavItem[] = [
    { key: 'PRODUCTS', routerLink: '/products' },
    { key: 'ABOUT', routerLink: '/about' },
    { key: 'PARTNERS', routerLink: '/partners' },
    { key: 'CONTACT', routerLink: '/contact' },
  ];

  // --- Lifecycle ---

  constructor() {
    // Close mobile menu automatically on every route change
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.isMobileMenuOpen.set(false));
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Run the scroll handler OUTSIDE Angular's zone so it never triggers change detection on every scroll event (~60fps).
    this.ngZone.runOutsideAngular(() => {
      this.scrollListener = () => {
        const scrolled = window.scrollY > 20;
        // Only re-enter the zone when the value actually changes
        if (this.isScrolled() !== scrolled) {
          this.ngZone.run(() => this.isScrolled.set(scrolled));
        }
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  // --- Mobile Menu ---

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }
}
