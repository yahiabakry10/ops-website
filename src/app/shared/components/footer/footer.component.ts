import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

interface QuickLink {
  key: string;
  path: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  products: string[] = ['PremiumCare HMIS', 'PremiumERP'];

  quickLinks: QuickLink[] = [
    { key: 'HOME', path: '/' },
    { key: 'PRODUCTS', path: '/products' },
    { key: 'ABOUT', path: '/about' },
    { key: 'CONTACT', path: '/contact' },
  ];
}
