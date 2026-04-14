import { Component, input } from '@angular/core';

@Component({
  selector: 'app-secondary-card-info',
  imports: [],
  templateUrl: './secondary-card-info.component.html',
  styleUrl: './secondary-card-info.component.css',
})
export class SecondaryCardInfoComponent {
  iconClass = input<string>('');
}
