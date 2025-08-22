import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterSidebarComponent, FilterState } from '../../components/filter-sidebar/filter-sidebar.component';
import { ProgramCardComponent } from '../../components/program-card/program-card.component';
import { Program } from '../../components/program-card/program-card.model';

interface SortOption {
  value: string;
  label: string;
}

interface ActiveFilter {
  type: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-find-program',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterSidebarComponent, ProgramCardComponent],
  templateUrl: './find-program.component.html',
  styleUrls: ['./find-program.component.scss']
})
export class FindProgramComponent implements OnInit {
  searchQuery = '';
  selectedTab: 'all' | 'previous' | 'saved' = 'all';
  selectedSort = 'alphabetical-az';
  
  sortOptions: SortOption[] = [
    { value: 'alphabetical-az', label: 'Alphabetical (A - Z)' },
    { value: 'alphabetical-za', label: 'Alphabetical (Z - A)' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  activeFilters: ActiveFilter[] = [
    { type: 'country', value: 'australia', label: 'Australia' }
  ];

  allPrograms: Program[] = [
    {
      id: '1',
      title: 'Study Abroad in Paris',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/764c0093af4bd2a8a1455ba91ea8c83e70df0fa7?width=712',
      locations: ['Paris, France'],
      season: 'FALL, SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.',
      country: 'france',
      terms: ['fall', 'spring'],
      programType: 'exchange',
      region: 'europe'
    },
    {
      id: '2',
      title: 'Study Abroad in Melbourne',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0dc66f7c97d6a3a9d001a46e1b9438dcdaffe369?width=712',
      locations: ['Melbourne, Australia'],
      season: 'FALL, SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.',
      country: 'australia',
      terms: ['fall', 'spring'],
      programType: 'exchange',
      region: 'asia-pacific'
    },
    {
      id: '3',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a29b9af10568e4e6eff17aeef0063d91c8bb84cf?width=712',
      locations: ['Sydney, Australia'],
      season: 'SUMMER',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.',
      country: 'australia',
      terms: ['summer'],
      programType: 'internship',
      region: 'asia-pacific'
    },
    {
      id: '4',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a58a4065ffa5941d01cbf261c3f7d1e6080d69c1?width=712',
      locations: ['London, England'],
      season: 'FALL',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.',
      country: 'england',
      terms: ['fall'],
      programType: 'research',
      region: 'europe'
    },
    {
      id: '5',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/06f18572d999f9f53976185d600ee5f723ea8d6f?width=712',
      locations: ['Chamonix, France'],
      season: 'SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.',
      country: 'france',
      terms: ['spring'],
      programType: 'language',
      region: 'europe'
    },
    {
      id: '6',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/98cdc865b0f7ef65c852040146b69292785e6922?width=712',
      locations: ['Amsterdam, Netherlands'],
      season: 'SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.',
      country: 'netherlands',
      terms: ['spring'],
      programType: 'service',
      region: 'europe'
    }
  ];

  filteredPrograms: Program[] = [];
  filterState: FilterState | null = null;

  ngOnInit() {
    this.applyFilters();
  }

  onFiltersChange(filterState: FilterState) {
    this.filterState = filterState;
    this.updateActiveFilters();
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  onTabChange(tab: 'all' | 'previous' | 'saved') {
    this.selectedTab = tab;
    this.applyFilters();
  }

  onSortChange() {
    this.sortPrograms();
  }

  removeFilter(filter: ActiveFilter) {
    if (!this.filterState) return;

    // Find and uncheck the filter option
    const filterGroup = this.filterState.filters.find(group => 
      group.title.toLowerCase() === filter.type + 's' || 
      (filter.type === 'country' && group.title === 'Countries') ||
      (filter.type === 'term' && group.title === 'Terms') ||
      (filter.type === 'programType' && group.title === 'Program Types') ||
      (filter.type === 'region' && group.title === 'Region')
    );

    if (filterGroup) {
      const option = filterGroup.options.find(opt => opt.value === filter.value);
      if (option) {
        option.checked = false;
      }
    }

    this.updateActiveFilters();
    this.applyFilters();
  }

  removeAllFilters() {
    if (!this.filterState) return;

    // Uncheck all filter options
    this.filterState.filters.forEach(group => {
      group.options.forEach(option => {
        option.checked = false;
      });
    });
    
    this.filterState.acceptingApplications = false;
    this.updateActiveFilters();
    this.applyFilters();
  }

  private updateActiveFilters() {
    this.activeFilters = [];

    if (!this.filterState) return;

    // Add active filters from each group
    this.filterState.filters.forEach(group => {
      const checkedOptions = group.options.filter(option => option.checked);
      checkedOptions.forEach(option => {
        let type = group.title.toLowerCase();
        if (type.endsWith('s')) type = type.slice(0, -1); // Remove 's'
        if (type === 'program type') type = 'programType';
        
        this.activeFilters.push({
          type,
          value: option.value,
          label: option.label
        });
      });
    });
  }

  private applyFilters() {
    let filtered = [...this.allPrograms];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(query) ||
        program.locations.some(loc => loc.toLowerCase().includes(query)) ||
        program.description.toLowerCase().includes(query)
      );
    }

    // Apply active filters
    if (this.filterState) {
      this.filterState.filters.forEach(group => {
        const checkedOptions = group.options.filter(option => option.checked);
        if (checkedOptions.length > 0) {
          const groupType = group.title.toLowerCase();
          filtered = filtered.filter(program => {
            return checkedOptions.some(option => {
              switch (groupType) {
                case 'terms':
                  return (program as any).terms?.includes(option.value);
                case 'countries':
                  return (program as any).country === option.value;
                case 'program types':
                  return (program as any).programType === option.value;
                case 'region':
                  return (program as any).region === option.value;
                default:
                  return false;
              }
            });
          });
        }
      });
    }

    this.filteredPrograms = filtered;
    this.sortPrograms();
  }

  private sortPrograms() {
    switch (this.selectedSort) {
      case 'alphabetical-az':
        this.filteredPrograms.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alphabetical-za':
        this.filteredPrograms.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        // For demo purposes, sort by ID (newest first)
        this.filteredPrograms.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'oldest':
        // For demo purposes, sort by ID (oldest first)
        this.filteredPrograms.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }
  }

  get selectedSortLabel(): string {
    return this.sortOptions.find(option => option.value === this.selectedSort)?.label || '';
  }

  get resultCount(): number {
    return this.filteredPrograms.length;
  }
}
