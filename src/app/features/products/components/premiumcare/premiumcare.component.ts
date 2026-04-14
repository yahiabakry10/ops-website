import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PREMIUM_CARE_FEATURES, PREMIUM_CARE_MODULES, MODULE_DETAILS } from '../../products-data';
import type {
  PremiumCareFeature,
  PremiumCareModules,
  ModuleDetail,
} from '../../models/products.interface';
import { SecondaryCardInfoComponent } from '../../../../shared/components/secondary-card-info/secondary-card-info.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-premiumcare',
  imports: [TranslatePipe, SecondaryCardInfoComponent, ScrollRevealDirective],
  templateUrl: './premiumcare.component.html',
})
export class PremiumcareComponent {
  // --- Data Signals ---

  readonly premiumCareFeatures = signal<PremiumCareFeature[]>(PREMIUM_CARE_FEATURES);
  readonly premiumCareModules = signal<PremiumCareModules>(PREMIUM_CARE_MODULES);
  readonly moduleDetails = signal<ModuleDetail[]>(MODULE_DETAILS);

  readonly hmisChecks = signal<string[]>([
    'PRODUCTS.HMIS.CHECKS.ANGULAR',
    'PRODUCTS.HMIS.CHECKS.LANG',
    'PRODUCTS.HMIS.CHECKS.DB',
    'PRODUCTS.HMIS.CHECKS.AUTH',
  ]);

  // --- Tab State ---

  /** Index of the currently active tab (0 = Front Office, 1 = Financial, 2 = Back Office) */
  readonly activeTab = signal<number>(0);

  setActiveTab(index: number): void {
    this.activeTab.set(index);
  }

  // --- Accordion State ---

  /**
   * Set of open panel IDs — like p-accordion [multiple]="true" behaviour,
   * allowing any number of panels to be open simultaneously.
   */
  readonly openPanels = signal<Set<string>>(new Set());

  togglePanel(id: string): void {
    this.openPanels.update((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isOpen(id: string): boolean {
    return this.openPanels().has(id);
  }
}
