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
  templateUrl: './program-finder.component.html',
  styleUrls: ['./program-finder.component.scss']
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
