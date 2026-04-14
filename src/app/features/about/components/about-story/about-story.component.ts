import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about-story',
  imports: [TranslatePipe, ScrollRevealDirective],
  templateUrl: './about-story.component.html',
  styleUrl: './about-story.component.css',
})
export class AboutStoryComponent {}
