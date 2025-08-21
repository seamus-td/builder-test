import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FilterSection {
  id: string;
  title: string;
  isExpanded: boolean;
  options?: string[];
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="w-full lg:w-80 bg-white rounded-lg shadow-sm p-4 md:p-6 h-fit">
      <!-- Header -->
      <div class="flex items-center gap-2 mb-6">
        <i class="material-icons text-2xl text-gray-900">filter_list</i>
        <h2 class="text-xl font-bold text-gray-900">Filters</h2>
      </div>

      <!-- Filter for accepting applications -->
      <div class="mb-6">
        <label class="flex items-center justify-between cursor-pointer">
          <span class="text-gray-700">Accepting Applications</span>
          <div class="relative">
            <input 
              type="checkbox" 
              [(ngModel)]="acceptingApplications" 
              class="sr-only"
            />
            <div [class]="acceptingApplications() ? 'bg-blue-600' : 'bg-gray-200'" 
                 class="w-11 h-6 rounded-full transition-colors">
              <div [class]="acceptingApplications() ? 'translate-x-6' : 'translate-x-1'" 
                   class="w-4 h-4 bg-white rounded-full mt-1 transition-transform"></div>
            </div>
          </div>
        </label>
      </div>

      <!-- Filter sections -->
      <div class="space-y-1">
        <div *ngFor="let section of filterSections()" 
             class="border-t border-gray-200 first:border-t-0">
          <button 
            (click)="toggleSection(section.id)"
            class="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 rounded px-2 -mx-2"
          >
            <span class="font-semibold text-gray-900">{{ section.title }}</span>
            <i class="material-icons text-gray-600">
              {{ section.isExpanded ? 'remove' : 'add' }}
            </i>
          </button>
          
          <!-- Expanded content would go here -->
          <div *ngIf="section.isExpanded" class="pb-4 px-2">
            <div class="text-sm text-gray-600">
              Filter options for {{ section.title }}
            </div>
          </div>
        </div>
      </div>

      <!-- Reset filters button -->
      <button class="w-full mt-6 py-3 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium">
        Reset filters
      </button>
    </aside>
  `
})
export class FilterSidebarComponent {
  acceptingApplications = signal(false);

  filterSections = signal<FilterSection[]>([
    { id: 'terms', title: 'Terms', isExpanded: false },
    { id: 'countries', title: 'Countries', isExpanded: false },
    { id: 'program-types', title: 'Program Types', isExpanded: false },
    { id: 'region', title: 'Region', isExpanded: false }
  ]);

  toggleSection(sectionId: string) {
    this.filterSections.update(sections => 
      sections.map(section => 
        section.id === sectionId 
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  }
}
