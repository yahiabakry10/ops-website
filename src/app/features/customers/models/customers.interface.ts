export type CustomerCategory = 'Hospital' | 'Medical Center';

export type filterType = 'All' | CustomerCategory;

export interface Customers {
  name: string;
  location: string;
  category: CustomerCategory;
}
