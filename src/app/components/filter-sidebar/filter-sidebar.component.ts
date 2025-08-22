import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterComponent } from "../filter/filter.component";
import { Filter } from "../filter/filter.model";

@Component({
  selector: "app-filter-sidebar",
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: "./filter-sidebar.component.html",
  styleUrl: "./filter-sidebar.component.scss",
})
export class FilterSidebarComponent {
  @Input() filters: Filter[] = [];
  @Input() acceptingApplications: boolean = false;
  
  @Output() filtersChange = new EventEmitter<Filter[]>();
  @Output() acceptingApplicationsChange = new EventEmitter<boolean>();
  @Output() resetFilters = new EventEmitter<void>();

  onFilterChange(updatedFilter: Filter): void {
    const filterIndex = this.filters.findIndex(f => f.id === updatedFilter.id);
    if (filterIndex !== -1) {
      this.filters[filterIndex] = updatedFilter;
      this.filtersChange.emit(this.filters);
    }
  }

  onOptionToggle(event: { filterId: string; optionValue: string; selected: boolean }): void {
    // This event can be used for additional processing if needed
    console.log('Option toggled:', event);
  }

  onAcceptingApplicationsChange(): void {
    this.acceptingApplications = !this.acceptingApplications;
    this.acceptingApplicationsChange.emit(this.acceptingApplications);
  }

  onResetFilters(): void {
    // Reset all filters
    this.filters.forEach(filter => {
      filter.selectedOptions = [];
      filter.isExpanded = false;
    });
    this.acceptingApplications = false;
    
    this.filtersChange.emit(this.filters);
    this.acceptingApplicationsChange.emit(this.acceptingApplications);
    this.resetFilters.emit();
  }

  get hasActiveFilters(): boolean {
    return this.acceptingApplications ||
           this.filters.some(filter => filter.selectedOptions.length > 0);
  }

  filterTrackBy(index: number, filter: Filter): string {
    return filter.id;
  }
}
