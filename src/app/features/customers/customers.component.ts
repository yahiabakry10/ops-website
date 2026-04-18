import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Customers, filterType } from './models/customers.interface';

@Component({
  selector: 'app-customers',
  imports: [ScrollRevealDirective],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  customers: WritableSignal<Customers[]> = signal<Customers[]>([
    // Hospitals
    { name: 'Military Production Hospital', location: 'Cairo, Egypt', category: 'Hospital' },
    { name: 'Rabia Hospital', location: 'Riyadh, Saudi Arabia', category: 'Hospital' },
    { name: 'Islamic Hospital', location: 'Cairo, Egypt', category: 'Hospital' },
    { name: 'Fouad Hospital', location: 'Cairo, Egypt', category: 'Hospital' },
    {
      name: 'Al-Jazeera International Hospital (SALLAB)',
      location: 'Mansoura, Egypt',
      category: 'Hospital',
    },
    { name: 'Nile Hospital', location: 'Minya, Egypt', category: 'Hospital' },
    { name: 'AlNahar Hospital', location: 'Alexandria, Egypt', category: 'Hospital' },
    { name: 'AlRazy Hospital', location: 'Monoufia, Egypt', category: 'Hospital' },
    { name: 'Lymar Hospital (Pediatrics)', location: 'Demiatta, Egypt', category: 'Hospital' },
    { name: 'Tiba Hospital', location: 'Alexandria, Egypt', category: 'Hospital' },
    { name: 'Dr. Ibrahim Nada Hospital', location: 'Alexandria, Egypt', category: 'Hospital' },
    { name: 'Badrawy Hospital', location: 'Alexandria, Egypt', category: 'Hospital' },
    { name: 'Sidi Beshr Royal Hospital', location: 'Alexandria, Egypt', category: 'Hospital' },
    { name: 'Fargallah Charitable Hospital', location: 'Alexandria, Egypt', category: 'Hospital' },
    { name: 'Synapse Hospital (Pediatrics)', location: 'Alexandria, Egypt', category: 'Hospital' },

    // Medical Centers & Polyclinics
    {
      name: 'Saint Mary Medical Center',
      location: 'Cairo - ElKanater, Egypt',
      category: 'Medical Center',
    },
    {
      name: 'Enaya Medical Centers',
      location: 'Giza - Sheik Zayed, Egypt',
      category: 'Medical Center',
    },
    {
      name: 'Fouad Orthopedic Medical Center',
      location: '10th of Ramadan, Egypt',
      category: 'Medical Center',
    },
    {
      name: 'El-Sewedy Medical Group',
      location: 'Madinat Nasr, Cairo, Egypt',
      category: 'Medical Center',
    },
    { name: 'Nile Specialized Clinics', location: 'Tanta, Egypt', category: 'Medical Center' },
    {
      name: 'AlTabib AlAraby Medical Center',
      location: 'Monoufia, Egypt',
      category: 'Medical Center',
    },
    {
      name: 'AlYousr Obstetrics and Gynecology Medical Center',
      location: '10th of Ramadan, Egypt',
      category: 'Medical Center',
    },
    { name: 'Eiadty Medical Center', location: 'Cairo, Egypt', category: 'Medical Center' },
    {
      name: 'Al-Mahaba Medical Center (Dialysis)',
      location: 'Cairo, Egypt',
      category: 'Medical Center',
    },
    { name: 'Aldawa Medical Center', location: 'Cairo, Egypt', category: 'Medical Center' },
    { name: 'Dr. Tarek Omar Clinics', location: 'Alexandria, Egypt', category: 'Medical Center' },
  ]);

  filters: WritableSignal<filterType[]> = signal<filterType[]>([
    'All',
    'Hospital',
    'Medical Center',
  ]);

  activeFilter: WritableSignal<filterType> = signal<filterType>('All');

  filteredCustomers: Signal<(Customers & { trackId: string })[]> = computed(() => {
    const filter = this.activeFilter();
    const list =
      filter === 'All'
        ? this.customers()
        : this.customers().filter((customer) => customer.category === filter);

    return list.map((c) => ({ ...c, trackId: `${c.name}_${filter}` }));
  });

  setActiveFilter(filter: filterType) {
    this.activeFilter.set(filter);
  }

  getFilteredLabel(filter: filterType): string {
    return filter === 'All' ? 'All Customers' : `${filter}s`;
  }
}
