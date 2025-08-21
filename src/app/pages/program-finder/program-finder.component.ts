import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { EnhancedSearchComponent } from '../../components/enhanced-search/enhanced-search.component';
import { TabNavigationComponent } from '../../components/tab-navigation/tab-navigation.component';
import { ProgramCardComponent } from '../../components/program-card/program-card.component';
import { Program } from '../../components/program-card/program-card.model';

@Component({
  selector: 'app-program-finder',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FilterSidebarComponent,
    EnhancedSearchComponent,
    TabNavigationComponent,
    ProgramCardComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <app-header></app-header>

      <!-- Main Content -->
      <main class="max-w-screen-2xl mx-auto px-6 py-8">
        <!-- Page Title -->
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Find a program</h1>

        <div class="flex gap-8">
          <!-- Filter Sidebar -->
          <app-filter-sidebar class="flex-shrink-0"></app-filter-sidebar>

          <!-- Main Content Area -->
          <div class="flex-1">
            <!-- Search Bar -->
            <div class="mb-6">
              <app-enhanced-search 
                (search)="onSearch($event)"
                class="block w-full max-w-2xl">
              </app-enhanced-search>
            </div>

            <!-- Sort and Results Info -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-8">
                <!-- Tab Navigation -->
                <app-tab-navigation (tabChange)="onTabChange($event)"></app-tab-navigation>
              </div>

              <div class="flex items-center gap-4">
                <span class="text-sm text-gray-600">Sort by</span>
                <select class="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Alphabetical (A - Z)</option>
                  <option>Alphabetical (Z - A)</option>
                  <option>Most Popular</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <!-- Active Filters -->
            <div class="flex items-center gap-4 mb-6" *ngIf="hasActiveFilters">
              <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                <span class="text-sm text-gray-900">Australia</span>
                <button class="ml-2 text-gray-600 hover:text-gray-900">
                  <span class="text-xs">×</span>
                </button>
              </div>
              <button class="text-sm text-blue-600 font-semibold hover:text-blue-800">
                Remove filters
              </button>
            </div>

            <!-- Results Count -->
            <div class="flex justify-end mb-6">
              <span class="text-gray-700 font-semibold">{{ programs().length }} Results</span>
            </div>

            <!-- Program Cards Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <app-program-card 
                *ngFor="let program of programs()" 
                [program]="program"
                class="flex justify-center">
              </app-program-card>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class ProgramFinderComponent {
  hasActiveFilters = true; // For demo purposes
  
  programs = signal<Program[]>([
    {
      id: '1',
      title: 'Study Abroad in Paris',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/764c0093af4bd2a8a1455ba91ea8c83e70df0fa7?width=712',
      location: 'Paris, France',
      season: 'FALL, SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '2',
      title: 'Study Abroad in Melbourne',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0dc66f7c97d6a3a9d001a46e1b9438dcdaffe369?width=712',
      location: 'Melbourne, Australia',
      season: 'FALL, SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '3',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a29b9af10568e4e6eff17aeef0063d91c8bb84cf?width=712',
      location: 'Sydney, Australia',
      season: 'SUMMER',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '4',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/a58a4065ffa5941d01cbf261c3f7d1e6080d69c1?width=712',
      location: 'London, England',
      season: 'FALL',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '5',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/06f18572d999f9f53976185d600ee5f723ea8d6f?width=712',
      location: 'Chamonix, France',
      season: 'SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '6',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/98cdc865b0f7ef65c852040146b69292785e6922?width=712',
      location: 'Amsterdam, Netherlands',
      season: 'SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    }
  ]);

  onSearch(query: string) {
    console.log('Search query:', query);
    // Implement search logic here
  }

  onTabChange(tabId: string) {
    console.log('Selected tab:', tabId);
    // Implement tab filtering logic here
  }
}
