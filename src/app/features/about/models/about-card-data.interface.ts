export interface AboutCardData {
  id: string;
  icon: string;
  title: string;
  type: 'text' | 'list';
  text?: string;
  textClass?: string;
  items?: string[];
}
