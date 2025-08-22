export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface Filter {
  id: string;
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  isExpanded: boolean;
}
