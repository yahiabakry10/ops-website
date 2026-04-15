import { Component } from '@angular/core';
import { CtaComponent } from './components/cta/cta.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ShowcaseComponent } from './components/showcase/showcase.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ServicesComponent,
    CtaComponent,
    ClientsComponent,
    ScrollRevealDirective,
    ShowcaseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
