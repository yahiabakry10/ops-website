import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { MOBILE_APP_FEATURES } from '../../products-data';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-mobile-app',
  imports: [TranslatePipe, ScrollRevealDirective],
  templateUrl: './mobile-app.component.html',
  styleUrl: './mobile-app.component.css',
})
export class MobileAppComponent {
  readonly mobileAppFeatures = signal<string[]>(MOBILE_APP_FEATURES);
}
