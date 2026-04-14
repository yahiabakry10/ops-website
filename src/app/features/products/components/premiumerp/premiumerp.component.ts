import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import type { ErpModule } from '../../models/products.interface';
import { ERP_MODULES } from '../../products-data';
import { SecondaryCardInfoComponent } from '../../../../shared/components/secondary-card-info/secondary-card-info.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-premiumerp',
  imports: [TranslatePipe, SecondaryCardInfoComponent, ScrollRevealDirective],
  templateUrl: './premiumerp.component.html',
  styleUrl: './premiumerp.component.css',
})
export class PremiumerpComponent {
  readonly erpModules = signal<ErpModule[]>(ERP_MODULES);
}
