import { Component, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface Filter {
  title: string;
  isExpanded: boolean;
  options: string[];
  selectedOptions: string[];
}

@Component({
  selector: "app-filter-sidebar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="w-full lg:w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
      <!-- Filter Header -->
      <div class="flex items-center space-x-2 mb-6">
        <span class="material-icons text-2xl text-gray-900">filter_list</span>
        <h2 class="text-xl font-bold text-gray-900">Filters</h2>
      </div>

      <!-- Accepting Applications Toggle -->
      <div
        class="flex items-center justify-between mb-6 pb-6 border-b border-gray-200"
      >
        <label class="text-base text-gray-700">Accepting Applications</label>
        <div class="relative">
          <input
            type="checkbox"
            [(ngModel)]="acceptingApplications"
            (change)="onFilterChange()"
            class="sr-only"
          />
          <div
            [class]="acceptingApplications ? 'bg-blue-600' : 'bg-gray-200'"
            class="w-11 h-6 rounded-full cursor-pointer transition-colors"
            (click)="
              acceptingApplications = !acceptingApplications; onFilterChange()
            "
          >
            <div
              [class]="
                acceptingApplications ? 'translate-x-5' : 'translate-x-1'
              "
              class="w-4 h-4 bg-white rounded-full mt-1 transition-transform"
            ></div>
          </div>
        </div>
      </div>

      <!-- Filter Sections -->
      <div class="space-y-0">
        <div
          *ngFor="let filter of filters; let i = index"
          class="border-t border-gray-200 first:border-t-0"
        >
          <button
            (click)="toggleFilter(i)"
            class="w-full flex items-center justify-between py-4 text-left"
          >
            <span class="text-base font-semibold text-gray-900">{{
              filter.title
            }}</span>
            <span class="material-icons text-gray-600">
              {{ filter.isExpanded ? "remove" : "add" }}
            </span>
          </button>

          <!-- Expanded Filter Options -->
          <div *ngIf="filter.isExpanded" class="pb-4 space-y-3">
            <div
              *ngFor="let option of filter.options"
              class="flex items-center"
            >
              <input
                type="checkbox"
                [id]="filter.title + '-' + option"
                [checked]="filter.selectedOptions.includes(option)"
                (change)="onOptionToggle(i, option)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                [for]="filter.title + '-' + option"
                class="ml-3 text-sm text-gray-700 cursor-pointer"
              >
                {{ option }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Reset Filters Button -->
      <button
        (click)="resetFilters()"
        class="w-full mt-6 py-3 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
      >
        Reset filters
      </button>
    </aside>
  `,
})
export class FilterSidebarComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  acceptingApplications = false;

  filters: Filter[] = [
    {
      title: "Terms",
      isExpanded: false,
      options: ["Fall", "Spring", "Summer", "Academic Year"],
      selectedOptions: [],
    },
    {
      title: "Countries",
      isExpanded: false,
      options: [
        "Australia",
        "France",
        "England",
        "Netherlands",
        "Spain",
        "Italy",
        "Germany",
      ],
      selectedOptions: [],
    },
    {
      title: "Program Types",
      isExpanded: false,
      options: [
        "Study Abroad",
        "Internship",
        "Research",
        "Service Learning",
        "Language Immersion",
      ],
      selectedOptions: [],
    },
    {
      title: "Region",
      isExpanded: false,
      options: [
        "Europe",
        "Asia-Pacific",
        "North America",
        "South America",
        "Africa",
      ],
      selectedOptions: [],
    },
  ];

  toggleFilter(index: number) {
    this.filters[index].isExpanded = !this.filters[index].isExpanded;
  }

  onOptionToggle(filterIndex: number, option: string) {
    const filter = this.filters[filterIndex];
    const optionIndex = filter.selectedOptions.indexOf(option);

    if (optionIndex > -1) {
      filter.selectedOptions.splice(optionIndex, 1);
    } else {
      filter.selectedOptions.push(option);
    }

    this.onFilterChange();
  }

  resetFilters() {
    this.acceptingApplications = false;
    this.filters.forEach((filter) => {
      filter.selectedOptions = [];
      filter.isExpanded = false;
    });
    this.onFilterChange();
  }

  onFilterChange() {
    const filterData = {
      acceptingApplications: this.acceptingApplications,
      terms: this.filters[0].selectedOptions,
      countries: this.filters[1].selectedOptions,
      programTypes: this.filters[2].selectedOptions,
      regions: this.filters[3].selectedOptions,
    };
    this.filtersChanged.emit(filterData);
  }
}
