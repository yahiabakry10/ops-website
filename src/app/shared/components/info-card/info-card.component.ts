import { Component, input, InputSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-info-card',
  imports: [TranslatePipe],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  icon: InputSignal<string> = input.required<string>();
  title: InputSignal<string> = input.required<string>();
}
