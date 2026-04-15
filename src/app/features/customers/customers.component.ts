import { Component, signal, WritableSignal } from '@angular/core';
import { Customers } from '../about/models/customers.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { MainHeaderComponent } from '../../shared/components/main-header/main-header.component';

@Component({
  selector: 'app-customers',
  imports: [TranslatePipe, ScrollRevealDirective, MainHeaderComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  readonly customers: WritableSignal<Customers[]> = signal<Customers[]>([
    {
      category: 'CUSTOMERS.CAT_HOSPITALS',
      list: [
        'CUSTOMERS.H1',
        'CUSTOMERS.H2',
        'CUSTOMERS.H3',
        'CUSTOMERS.H4',
        'CUSTOMERS.H5',
        'CUSTOMERS.H6',
        'CUSTOMERS.H7',
        'CUSTOMERS.H8',
        'CUSTOMERS.H9',
        'CUSTOMERS.H10',
        'CUSTOMERS.H11',
        'CUSTOMERS.H12',
        'CUSTOMERS.H13',
        'CUSTOMERS.H14',
        'CUSTOMERS.H15',
      ],
    },
    {
      category: 'CUSTOMERS.CAT_MEDICAL',
      list: [
        'CUSTOMERS.M1',
        'CUSTOMERS.M2',
        'CUSTOMERS.M3',
        'CUSTOMERS.M4',
        'CUSTOMERS.M5',
        'CUSTOMERS.M6',
        'CUSTOMERS.M7',
        'CUSTOMERS.M8',
        'CUSTOMERS.M9',
        'CUSTOMERS.M10',
        'CUSTOMERS.M11',
      ],
    },
  ]);
}
