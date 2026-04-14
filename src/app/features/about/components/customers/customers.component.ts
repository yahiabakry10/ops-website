import { Component, signal, WritableSignal } from '@angular/core';
import { Customers } from '../../models/customers.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-customers',
  imports: [TranslatePipe, ScrollRevealDirective],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  readonly customers: WritableSignal<Customers[]> = signal<Customers[]>([
    {
      category: 'ABOUT.CUSTOMERS.CAT_HOSPITALS',
      list: [
        'ABOUT.CUSTOMERS.H1',
        'ABOUT.CUSTOMERS.H2',
        'ABOUT.CUSTOMERS.H3',
        'ABOUT.CUSTOMERS.H4',
        'ABOUT.CUSTOMERS.H5',
        'ABOUT.CUSTOMERS.H6',
        'ABOUT.CUSTOMERS.H7',
        'ABOUT.CUSTOMERS.H8',
        'ABOUT.CUSTOMERS.H9',
        'ABOUT.CUSTOMERS.H10',
        'ABOUT.CUSTOMERS.H11',
        'ABOUT.CUSTOMERS.H12',
        'ABOUT.CUSTOMERS.H13',
        'ABOUT.CUSTOMERS.H14',
        'ABOUT.CUSTOMERS.H15',
      ],
    },
    {
      category: 'ABOUT.CUSTOMERS.CAT_MEDICAL',
      list: [
        'ABOUT.CUSTOMERS.M1',
        'ABOUT.CUSTOMERS.M2',
        'ABOUT.CUSTOMERS.M3',
        'ABOUT.CUSTOMERS.M4',
        'ABOUT.CUSTOMERS.M5',
        'ABOUT.CUSTOMERS.M6',
        'ABOUT.CUSTOMERS.M7',
        'ABOUT.CUSTOMERS.M8',
        'ABOUT.CUSTOMERS.M9',
        'ABOUT.CUSTOMERS.M10',
        'ABOUT.CUSTOMERS.M11',
      ],
    },
  ]);
}
