import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversityHeaderComponent } from '../../components/university-header/university-header.component';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { ProgramCardComponent } from '../../components/program-card/program-card.component';
import { Program } from '../../components/program-card/program-card.model';

@Component({
  selector: 'app-program-finder',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    UniversityHeaderComponent, 
    FilterSidebarComponent, 
    ProgramCardComponent
  ],
  template: `
    <!-- Header -->
    <app-university-header></app-university-header>

    <!-- Main Content -->
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Page Title -->
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Find a program</h1>

        <div class="flex gap-8">
          <!-- Filter Sidebar -->
          <app-filter-sidebar (filtersChanged)="onFiltersChanged($event)"></app-filter-sidebar>

          <!-- Main Content Area -->
          <div class="flex-1">
            <!-- Search Bar -->
            <div class="relative mb-6">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="onSearchChange()"
                placeholder="Search programs..."
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span class="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
            </div>

            <!-- Sort and Tab Controls -->
            <div class="flex items-center justify-between mb-6">
              <!-- Tabs -->
              <div class="flex space-x-8">
                <button 
                  *ngFor="let tab of tabs" 
                  (click)="selectedTab = tab"
                  [class]="selectedTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'"
                  class="pb-2 font-medium"
                >
                  {{ tab }}
                </button>
              </div>

              <!-- Sort Controls -->
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-600">Sort by</span>
                <select 
                  [(ngModel)]="sortBy"
                  (change)="onSortChange()"
                  class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="alphabetical">Alphabetical (A - Z)</option>
                  <option value="newest">Newest First</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>

            <!-- Results Count and Active Filters -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-4">
                <!-- Active Filters -->
                <div *ngIf="activeFilters().length > 0" class="flex items-center space-x-2">
                  <div 
                    *ngFor="let filter of activeFilters()" 
                    class="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                  >
                    <span class="text-gray-800">{{ filter }}</span>
                    <button 
                      (click)="removeFilter(filter)"
                      class="ml-2 text-gray-600 hover:text-gray-800"
                    >
                      <span class="text-xs">×</span>
                    </button>
                  </div>
                  <button 
                    (click)="clearAllFilters()"
                    class="text-sm text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Remove filters
                  </button>
                </div>
              </div>
              
              <span class="text-base font-semibold text-gray-600">
                {{ filteredPrograms().length }} Results
              </span>
            </div>

            <!-- Program Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <app-program-card 
                *ngFor="let program of filteredPrograms()" 
                [program]="program"
              ></app-program-card>
            </div>

            <!-- Empty State -->
            <div *ngIf="filteredPrograms().length === 0" class="text-center py-12">
              <span class="material-icons text-gray-400 text-6xl mb-4">search_off</span>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
              <p class="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProgramFinderComponent {
  searchQuery = '';
  selectedTab = 'All';
  sortBy = 'alphabetical';
  currentFilters: any = {};

  tabs = ['All', 'Previously viewed', 'Saved'];

  programs: Program[] = [
    {
      id: '1',
      title: 'Study Abroad in Paris',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/764c0093af4bd2a8a1455ba91ea8c83e70df0fa7?width=712',
      location: 'Paris, France',
      terms: 'FALL, SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '2',
      title: 'Study Abroad in Melbourne',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0dc66f7c97d6a3a9d001a46e1b9438dcdaffe369?width=712',
      location: 'Melbourne, Australia',
      terms: 'FALL, SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '3',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a29b9af10568e4e6eff17aeef0063d91c8bb84cf?width=712',
      location: 'Sydney, Australia',
      terms: 'SUMMER',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '4',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a58a4065ffa5941d01cbf261c3f7d1e6080d69c1?width=712',
      location: 'London, England',
      terms: 'FALL',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '5',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/06f18572d999f9f53976185d600ee5f723ea8d6f?width=712',
      location: 'Chamonix, France',
      terms: 'SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '6',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/98cdc865b0f7ef65c852040146b69292785e6922?width=712',
      location: 'Amsterdam, Netherlands',
      terms: 'SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    }
  ];

  filteredPrograms: Program[] = this.programs;

  onFiltersChanged(filters: any) {
    this.currentFilters = filters;
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.programs];
    const filters = this.currentFilters;
    const searchTerm = this.searchQuery.toLowerCase();

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(program => 
        program.title.toLowerCase().includes(searchTerm) ||
        program.location.toLowerCase().includes(searchTerm) ||
        program.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply country filter
    if (filters.countries?.length > 0) {
      filtered = filtered.filter(program => 
        filters.countries.some((country: string) => 
          program.location.toLowerCase().includes(country.toLowerCase())
        )
      );
    }

    // Apply terms filter
    if (filters.terms?.length > 0) {
      filtered = filtered.filter(program => 
        filters.terms.some((term: string) => 
          program.terms.toLowerCase().includes(term.toLowerCase())
        )
      );
    }

    // Apply sorting
    switch (this.sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        // In a real app, this would sort by date
        filtered.reverse();
        break;
      case 'popularity':
        // In a real app, this would sort by popularity score
        break;
    }

    this.filteredPrograms = filtered;
  }

  activeFilters(): string[] {
    const filters = this.currentFilters;
    const active: string[] = [];
    
    if (filters.countries?.length > 0) {
      active.push(...filters.countries);
    }
    if (filters.terms?.length > 0) {
      active.push(...filters.terms);
    }
    if (filters.programTypes?.length > 0) {
      active.push(...filters.programTypes);
    }
    if (filters.regions?.length > 0) {
      active.push(...filters.regions);
    }
    
    return active;
  }

  removeFilter(filterToRemove: string) {
    const filters = { ...this.currentFilters };

    // Remove from all filter arrays
    Object.keys(filters).forEach(key => {
      if (Array.isArray(filters[key])) {
        filters[key] = filters[key].filter((item: string) => item !== filterToRemove);
      }
    });

    this.currentFilters = filters;
    this.applyFilters();
  }

  clearAllFilters() {
    this.currentFilters = {};
    this.searchQuery = '';
    this.applyFilters();
  }
}
