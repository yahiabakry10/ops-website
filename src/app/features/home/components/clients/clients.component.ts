import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface PartnerImage {
  id: string;
  src: string;
  alt: string;
}

interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

@Component({
  selector: 'app-clients',
  imports: [TranslateModule, RouterLink, ScrollRevealDirective],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {
  customers = signal<PartnerImage[]>([
    {
      id: 'partner1',
      src: '/images/rabea.jpg',
      alt: 'Rabia Hospital - Riyadh - Saudi Arabia',
    },
    {
      id: 'partner2',
      src: '/images/ElSewedy.png',
      alt: 'El Sewedy - Egypt',
    },
    {
      id: 'partner3',
      src: '/images/AlRazy.jpg',
      alt: 'Al Razy Hospital - Cairo - Egypt',
    },
    {
      id: 'partner4',
      src: '/images/ELEnatgharby.jpg',
      alt: 'Military Production Hospital - Cairo',
    },
    {
      id: 'partner5',
      src: '/images/salab.png',
      alt: 'Salab Medical Center - Cairo - Egypt',
    },
    {
      id: 'partner6',
      src: '/images/enaya.png',
      alt: 'Enaya Hospital - Cairo - Egypt',
    },
    {
      id: 'partner7',
      src: '/images/badrawy.jpg',
      alt: 'Badrawy Hospital - Cairo - Egypt',
    },
    {
      id: 'partner8',
      src: '/images/islamicHospital_n.jpg',
      alt: 'Islamic Hospital - Cairo - Egypt',
    },
  ]);

  responsiveOptions = signal<ResponsiveOption[]>([
    {
      breakpoint: '1400px',
      numVisible: 5,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1,
    },
  ]);
}
