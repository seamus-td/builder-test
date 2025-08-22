import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent, FilterOption } from '../filter/filter.component';

export interface FilterGroup {
  title: string;
  options: FilterOption[];
  isExpanded: boolean;
}

export interface FilterState {
  acceptingApplications: boolean;
  filters: FilterGroup[];
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent {
  @Output() filtersChange = new EventEmitter<FilterState>();

  acceptingApplications = false;
  
  filterGroups: FilterGroup[] = [
    {
      title: 'Terms',
      isExpanded: false,
      options: [
        { value: 'fall', label: 'Fall', checked: false },
        { value: 'spring', label: 'Spring', checked: false },
        { value: 'summer', label: 'Summer', checked: false },
        { value: 'winter', label: 'Winter', checked: false }
      ]
    },
    {
      title: 'Countries',
      isExpanded: false,
      options: [
        { value: 'australia', label: 'Australia', checked: false },
        { value: 'france', label: 'France', checked: false },
        { value: 'england', label: 'England', checked: false },
        { value: 'netherlands', label: 'Netherlands', checked: false },
        { value: 'italy', label: 'Italy', checked: false },
        { value: 'spain', label: 'Spain', checked: false },
        { value: 'germany', label: 'Germany', checked: false },
        { value: 'japan', label: 'Japan', checked: false }
      ]
    },
    {
      title: 'Program Types',
      isExpanded: false,
      options: [
        { value: 'exchange', label: 'Exchange Program', checked: false },
        { value: 'internship', label: 'Internship', checked: false },
        { value: 'research', label: 'Research Program', checked: false },
        { value: 'language', label: 'Language Immersion', checked: false },
        { value: 'service', label: 'Service Learning', checked: false },
        { value: 'faculty-led', label: 'Faculty-Led', checked: false }
      ]
    },
    {
      title: 'Region',
      isExpanded: false,
      options: [
        { value: 'europe', label: 'Europe', checked: false },
        { value: 'asia-pacific', label: 'Asia Pacific', checked: false },
        { value: 'north-america', label: 'North America', checked: false },
        { value: 'south-america', label: 'South America', checked: false },
        { value: 'africa', label: 'Africa', checked: false },
        { value: 'middle-east', label: 'Middle East', checked: false }
      ]
    }
  ];

  onAcceptingApplicationsChange(checked: boolean) {
    this.acceptingApplications = checked;
    this.emitFiltersChange();
  }

  onFilterGroupChange(groupIndex: number, options: FilterOption[]) {
    this.filterGroups[groupIndex].options = options;
    this.emitFiltersChange();
  }

  onFilterGroupExpandedChange(groupIndex: number, isExpanded: boolean) {
    this.filterGroups[groupIndex].isExpanded = isExpanded;
  }

  resetFilters() {
    this.acceptingApplications = false;
    this.filterGroups.forEach(group => {
      group.isExpanded = false;
      group.options.forEach(option => {
        option.checked = false;
      });
    });
    this.emitFiltersChange();
  }

  private emitFiltersChange() {
    const filterState: FilterState = {
      acceptingApplications: this.acceptingApplications,
      filters: this.filterGroups
    };
    this.filtersChange.emit(filterState);
  }
}
