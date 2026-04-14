import { Component, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { Activities } from '../../models/activities.interface';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-activities',
  imports: [TranslatePipe, InfoCardComponent, ScrollRevealDirective],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css',
})
export class ActivitiesComponent {
  readonly activities: WritableSignal<Activities[]> = signal<Activities[]>([
    {
      icon: 'pi-comments',
      title: 'ABOUT.ACTIVITIES.CONSULTATIONS.T',
      desc: 'ABOUT.ACTIVITIES.CONSULTATIONS.D',
    },
    {
      icon: 'pi-briefcase',
      title: 'ABOUT.ACTIVITIES.BUSINESS.T',
      desc: 'ABOUT.ACTIVITIES.BUSINESS.D',
    },
    { icon: 'pi-globe', title: 'ABOUT.ACTIVITIES.WEB.T', desc: 'ABOUT.ACTIVITIES.WEB.D' },
    { icon: 'pi-code', title: 'ABOUT.ACTIVITIES.APP_DEV.T', desc: 'ABOUT.ACTIVITIES.APP_DEV.D' },
    { icon: 'pi-mobile', title: 'ABOUT.ACTIVITIES.MOBILE.T', desc: 'ABOUT.ACTIVITIES.MOBILE.D' },
    {
      icon: 'pi-heart',
      title: 'ABOUT.ACTIVITIES.HEALTHCARE.T',
      desc: 'ABOUT.ACTIVITIES.HEALTHCARE.D',
    },
  ]);
}
