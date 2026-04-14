import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { Platform } from '../../models/products.interface';
import { PLATFORMS } from '../../products-data';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-platforms',
  imports: [InfoCardComponent, TranslatePipe, ScrollRevealDirective],
  templateUrl: './platforms.component.html',
  styleUrl: './platforms.component.css',
})
export class PlatformsComponent {
  readonly platforms = signal<Platform[]>(PLATFORMS);
}
