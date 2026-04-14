import { Component, signal, WritableSignal } from '@angular/core';
import { Milestones } from '../../models/milestones.interface';
import { TimelineModule } from 'primeng/timeline';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-history',
  imports: [TimelineModule, TranslatePipe, ScrollRevealDirective],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  readonly milestones: WritableSignal<Milestones[]> = signal<Milestones[]>([
    { year: '2005', event: 'ABOUT.MILESTONES.E1' },
    { year: '2010', event: 'ABOUT.MILESTONES.E2' },
    { year: '2015', event: 'ABOUT.MILESTONES.E3' },
    { year: '2020', event: 'ABOUT.MILESTONES.E4' },
    { year: '2025', event: 'ABOUT.MILESTONES.E5' },
  ]);
}
