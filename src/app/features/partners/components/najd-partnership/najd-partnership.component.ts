import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface PartnershipHighlight {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-najd-partnership',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './najd-partnership.component.html',
  styleUrl: './najd-partnership.component.css',
})
export class NajdPartnershipComponent {
  readonly highlights: PartnershipHighlight[] = [
    {
      icon: 'flag',
      titleKey: 'najdPartnership.highlights.regionalCoverage.title',
      descKey: 'najdPartnership.highlights.regionalCoverage.description',
    },
    {
      icon: 'building',
      titleKey: 'najdPartnership.highlights.healthcareFocus.title',
      descKey: 'najdPartnership.highlights.healthcareFocus.description',
    },
    {
      icon: 'chart-line',
      titleKey: 'najdPartnership.highlights.marketLeadership.title',
      descKey: 'najdPartnership.highlights.marketLeadership.description',
    },
  ];

  readonly lightRays = Array.from({ length: 5 }, (_, i) => i);
}
