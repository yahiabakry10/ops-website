import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from '../../shared/components/main-header/main-header.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SecondaryCardInfoComponent } from '../../shared/components/secondary-card-info/secondary-card-info.component';
import { TranslatePipe } from '@ngx-translate/core';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-partners',
  imports: [
    MainHeaderComponent,
    RouterLink,
    ScrollRevealDirective,
    SecondaryCardInfoComponent,
    TranslatePipe,
  ],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
})
export class PartnersComponent {
  najdFeatures: Feature[] = [
    {
      icon: 'pi-flag',
      title: 'partners.najd.features.marketLeadership.title',
      description: 'partners.najd.features.marketLeadership.description',
    },
    {
      icon: 'pi-building',
      title: 'partners.najd.features.healthcareFocus.title',
      description: 'partners.najd.features.healthcareFocus.description',
    },
    {
      icon: 'pi-users',
      title: 'partners.najd.features.regionalExpertise.title',
      description: 'partners.najd.features.regionalExpertise.description',
    },
    {
      icon: 'pi-chart-line',
      title: 'partners.najd.features.revenueOptimization.title',
      description: 'partners.najd.features.revenueOptimization.description',
    },
  ];

  nebrasAreas: Feature[] = [
    {
      icon: 'pi-code',
      title: 'partners.nebras.areas.softwareDevelopment.title',
      description: 'partners.nebras.areas.softwareDevelopment.description',
    },
    {
      icon: 'pi-cog',
      title: 'partners.nebras.areas.systemIntegration.title',
      description: 'partners.nebras.areas.systemIntegration.description',
    },
    {
      icon: 'pi-desktop',
      title: 'partners.nebras.areas.technicalSupport.title',
      description: 'partners.nebras.areas.technicalSupport.description',
    },
    {
      icon: 'pi-sitemap',
      title: 'partners.nebras.areas.solutionArchitecture.title',
      description: 'partners.nebras.areas.solutionArchitecture.description',
    },
  ];
}
