import { Component, signal, WritableSignal } from '@angular/core';
import { AboutCardData } from '../../models/about-card-data.interface';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Values } from '../../models/values.interface';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-ops-identity',
  imports: [InfoCardComponent, TranslatePipe, ScrollRevealDirective],
  templateUrl: './ops-identity.component.html',
  styleUrl: './ops-identity.component.css',
})
export class OpsIdentityComponent {
  readonly aboutCardInfo: WritableSignal<AboutCardData[]> = signal<AboutCardData[]>([
    {
      id: 'vision',
      icon: 'pi-eye',
      title: 'ABOUT.VISION.TITLE',
      type: 'text',
      text: 'ABOUT.VISION.TEXT',
      textClass: 'italic',
    },
    {
      id: 'mission',
      icon: 'pi-flag',
      title: 'ABOUT.MISSION.TITLE',
      type: 'list',
      items: ['ABOUT.MISSION.I1', 'ABOUT.MISSION.I2', 'ABOUT.MISSION.I3', 'ABOUT.MISSION.I4'],
    },
    {
      id: 'core-values',
      icon: 'pi-star',
      title: 'ABOUT.CORE_VALUES.TITLE',
      type: 'text',
      text: 'ABOUT.CORE_VALUES.TEXT',
      textClass: '',
    },
  ]);

  readonly values: WritableSignal<Values[]> = signal<Values[]>([
    {
      icon: 'pi-heart',
      title: 'ABOUT.VALUES.CUSTOMER_LOYALTY.T',
      description: 'ABOUT.VALUES.CUSTOMER_LOYALTY.D',
    },
    {
      icon: 'pi-users',
      title: 'ABOUT.VALUES.LEADERSHIP.T',
      description: 'ABOUT.VALUES.LEADERSHIP.D',
    },
    {
      icon: 'pi-shield',
      title: 'ABOUT.VALUES.HONESTY.T',
      description: 'ABOUT.VALUES.HONESTY.D',
    },
    {
      icon: 'pi-sun',
      title: 'ABOUT.VALUES.MOTIVATIONAL.T',
      description: 'ABOUT.VALUES.MOTIVATIONAL.D',
    },
    {
      icon: 'pi-globe',
      title: 'ABOUT.VALUES.DIVERSITY.T',
      description: 'ABOUT.VALUES.DIVERSITY.D',
    },
    {
      icon: 'pi-sort-alt',
      title: 'ABOUT.VALUES.BALANCE.T',
      description: 'ABOUT.VALUES.BALANCE.D',
    },
  ]);
}
