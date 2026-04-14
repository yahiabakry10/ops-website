import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { MainHeaderComponent } from '../../shared/components/main-header/main-header.component';
import { MobileAppComponent } from './components/mobile-app/mobile-app.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { PremiumcareComponent } from './components/premiumcare/premiumcare.component';
import { PremiumerpComponent } from './components/premiumerp/premiumerp.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  imports: [
    TranslatePipe,
    PremiumcareComponent,
    PremiumerpComponent,
    MobileAppComponent,
    MainHeaderComponent,
    PlatformsComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}
