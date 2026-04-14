import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

// --- Types ---

interface QuickLink {
  icon: string;
  label: string;
  path: string;
  description: string;
}

// --- Component ---

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  readonly quickLinks = signal<QuickLink[]>([
    {
      icon: 'pi-home',
      label: 'NOT_FOUND.LINKS.HOME.LABEL',
      path: '/',
      description: 'NOT_FOUND.LINKS.HOME.DESC',
    },
    {
      icon: 'pi-shopping-cart',
      label: 'NOT_FOUND.LINKS.PRODUCTS.LABEL',
      path: '/products',
      description: 'NOT_FOUND.LINKS.PRODUCTS.DESC',
    },
    {
      icon: 'pi-info-circle',
      label: 'NOT_FOUND.LINKS.ABOUT.LABEL',
      path: '/about',
      description: 'NOT_FOUND.LINKS.ABOUT.DESC',
    },
    {
      icon: 'pi-envelope',
      label: 'NOT_FOUND.LINKS.CONTACT.LABEL',
      path: '/contact',
      description: 'NOT_FOUND.LINKS.CONTACT.DESC',
    },
  ]);

  goBack(): void {
    window.history.back();
  }
}
