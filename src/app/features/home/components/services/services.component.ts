import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface Service {
  key: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-services',
  imports: [CommonModule, TranslatePipe, InfoCardComponent, ScrollRevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  services: Service[] = [
    {
      key: 'CONSULTATIONS',
      title: 'Technical Consultations',
      description: 'Provide technical consultations in all IT fields',
      icon: 'pi-desktop',
    },
    {
      key: 'BUSINESS',
      title: 'IT Business Solutions',
      description: 'Comprehensive IT solutions for your business needs',
      icon: 'pi-briefcase',
    },
    {
      key: 'WEB',
      title: 'Web Development',
      description: 'Modern and responsive web applications',
      icon: 'pi-globe',
    },
    {
      key: 'APP_DEV',
      title: 'Application Development',
      description: 'Custom application development and outsourcing',
      icon: 'pi-code',
    },
    {
      key: 'MOBILE',
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile app development',
      icon: 'pi-mobile',
    },
    {
      key: 'HEALTHCARE',
      title: 'Healthcare & ERP',
      description: 'Specialized in Healthcare Management and ERP Solutions',
      icon: 'pi-heart',
    },
  ];
}
