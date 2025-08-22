import { Component, OnInit, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProgramCardComponent } from "../../components/program-card/program-card.component";
import { FilterSidebarComponent } from "../../components/filter-sidebar/filter-sidebar.component";
import { Filter } from "../../components/filter/filter.model";
import { Program } from "../../components/program-card/program-card.model";

type SortOption = 'alphabetical' | 'newest' | 'relevance';
type ViewTab = 'all' | 'previously-viewed' | 'saved';

@Component({
  selector: "app-program-finder",
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProgramCardComponent, 
    FilterSidebarComponent
  ],
  templateUrl: "./program-finder.component.html",
  styleUrl: "./program-finder.component.scss",
})
export class ProgramFinderComponent implements OnInit {
  // Reactive signals
  searchTerm = signal<string>('');
  selectedTab = signal<ViewTab>('all');
  sortBy = signal<SortOption>('alphabetical');
  acceptingApplications = signal<boolean>(false);
  filters = signal<Filter[]>([]);
  
  // Programs data
  allPrograms = signal<Program[]>([]);
  
  // Applied filters (for display)
  appliedFilters = signal<Array<{id: string, label: string, value: string}>>([]);

  // Computed filtered programs
  filteredPrograms = computed(() => {
    let programs = this.allPrograms();
    
    // Filter by search term
    const search = this.searchTerm().toLowerCase();
    if (search) {
      programs = programs.filter(program => 
        program.title.toLowerCase().includes(search) ||
        program.locations.some(loc => loc.toLowerCase().includes(search)) ||
        program.description.toLowerCase().includes(search)
      );
    }

    // Filter by accepting applications
    if (this.acceptingApplications()) {
      programs = programs.filter(program => program.featured); // Using featured as proxy for accepting apps
    }

    // Filter by active filters
    const activeFilters = this.filters();
    activeFilters.forEach(filter => {
      if (filter.selectedOptions.length > 0) {
        programs = programs.filter(program => {
          return filter.selectedOptions.some(option => {
            switch (filter.id) {
              case 'terms':
                return program.season.toLowerCase().includes(option.toLowerCase());
              case 'countries':
                return program.locations.some(loc => loc.toLowerCase().includes(option.toLowerCase()));
              case 'program-types':
                return true; // Would need program type field
              case 'region':
                return true; // Would need region field
              default:
                return false;
            }
          });
        });
      }
    });

    // Sort programs
    const sortOption = this.sortBy();
    switch (sortOption) {
      case 'alphabetical':
        programs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        programs.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }

    return programs;
  });

  ngOnInit(): void {
    this.initializeFilters();
    this.loadPrograms();
  }

  private initializeFilters(): void {
    this.filters.set([
      {
        id: 'terms',
        title: 'Terms',
        options: [
          { id: 'fall', label: 'Fall', value: 'fall' },
          { id: 'spring', label: 'Spring', value: 'spring' },
          { id: 'summer', label: 'Summer', value: 'summer' },
          { id: 'winter', label: 'Winter', value: 'winter' }
        ],
        selectedOptions: [],
        isExpanded: false
      },
      {
        id: 'countries',
        title: 'Countries',
        options: [
          { id: 'australia', label: 'Australia', value: 'australia' },
          { id: 'france', label: 'France', value: 'france' },
          { id: 'england', label: 'England', value: 'england' },
          { id: 'netherlands', label: 'Netherlands', value: 'netherlands' },
          { id: 'germany', label: 'Germany', value: 'germany' },
          { id: 'italy', label: 'Italy', value: 'italy' }
        ],
        selectedOptions: [],
        isExpanded: false
      },
      {
        id: 'program-types',
        title: 'Program Types',
        options: [
          { id: 'semester', label: 'Semester Abroad', value: 'semester' },
          { id: 'summer-program', label: 'Summer Program', value: 'summer-program' },
          { id: 'internship', label: 'Internship', value: 'internship' },
          { id: 'research', label: 'Research', value: 'research' },
          { id: 'language', label: 'Language Immersion', value: 'language' }
        ],
        selectedOptions: [],
        isExpanded: false
      },
      {
        id: 'region',
        title: 'Region',
        options: [
          { id: 'europe', label: 'Europe', value: 'europe' },
          { id: 'oceania', label: 'Oceania', value: 'oceania' },
          { id: 'asia', label: 'Asia', value: 'asia' },
          { id: 'north-america', label: 'North America', value: 'north-america' },
          { id: 'south-america', label: 'South America', value: 'south-america' },
          { id: 'africa', label: 'Africa', value: 'africa' }
        ],
        selectedOptions: [],
        isExpanded: false
      }
    ]);
  }

  private loadPrograms(): void {
    // Mock data based on the Figma design
    this.allPrograms.set([
      {
        id: '1',
        title: 'Study Abroad in Paris',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/764c0093af4bd2a8a1455ba91ea8c83e70df0fa7?width=712',
        locations: ['Paris, France'],
        season: 'FALL, SPRING',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.',
        featured: true
      },
      {
        id: '2',
        title: 'Study Abroad in Melbourne',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/0dc66f7c97d6a3a9d001a46e1b9438dcdaffe369?width=712',
        locations: ['Melbourne, Australia'],
        season: 'FALL, SPRING',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
      },
      {
        id: '3',
        title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/a29b9af10568e4e6eff17aeef0063d91c8bb84cf?width=712',
        locations: ['Sydney, Australia'],
        season: 'SUMMER',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
      },
      {
        id: '4',
        title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/a58a4065ffa5941d01cbf261c3f7d1e6080d69c1?width=712',
        locations: ['London, England'],
        season: 'FALL',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
      },
      {
        id: '5',
        title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/06f18572d999f9f53976185d600ee5f723ea8d6f?width=712',
        locations: ['Chamonix, France'],
        season: 'SPRING',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
      },
      {
        id: '6',
        title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/98cdc865b0f7ef65c852040146b69292785e6922?width=712',
        locations: ['Amsterdam, Netherlands'],
        season: 'SPRING',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
      }
    ]);
  }

  // Event handlers
  onFiltersChange(updatedFilters: Filter[]): void {
    this.filters.set(updatedFilters);
    this.updateAppliedFilters();
  }

  onAcceptingApplicationsChange(accepting: boolean): void {
    this.acceptingApplications.set(accepting);
  }

  onResetFilters(): void {
    this.acceptingApplications.set(false);
    this.appliedFilters.set([]);
  }

  onTabChange(tab: ViewTab): void {
    this.selectedTab.set(tab);
  }

  onSortChange(sort: SortOption): void {
    this.sortBy.set(sort);
  }

  removeAppliedFilter(filterToRemove: {id: string, label: string, value: string}): void {
    const currentFilters = this.filters();
    const updatedFilters = currentFilters.map(filter => {
      if (filter.id === filterToRemove.id) {
        return {
          ...filter,
          selectedOptions: filter.selectedOptions.filter(option => option !== filterToRemove.value)
        };
      }
      return filter;
    });
    this.filters.set(updatedFilters);
    this.updateAppliedFilters();
  }

  private updateAppliedFilters(): void {
    const applied: Array<{id: string, label: string, value: string}> = [];

    this.filters().forEach(filter => {
      filter.selectedOptions.forEach(selectedValue => {
        const option = filter.options.find(opt => opt.value === selectedValue);
        if (option) {
          applied.push({
            id: filter.id,
            label: option.label,
            value: option.value
          });
        }
      });
    });

    this.appliedFilters.set(applied);
  }

  programTrackBy(index: number, program: Program): string {
    return program.id;
  }
}
