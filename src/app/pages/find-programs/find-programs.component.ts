import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramCardComponent } from '../../components/program-card/program-card.component';
import { Program } from '../../components/program-card/program-card.model';

@Component({
  selector: 'app-find-programs',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgramCardComponent],
  templateUrl: './find-programs.component.html',
  styleUrls: ['./find-programs.component.scss']
})
export class FindProgramsComponent {
  searchQuery = '';
  selectedCountries: string[] = ['Austria'];
  activeTab = 'All';
  sortBy = 'Alphabetical (A - Z)';
  showSort = false;

  tabs = ['All', 'Previously viewed', 'Saved'];
  
  countries = [
    { name: 'Afghanistan', selected: false },
    { name: 'America', selected: false },
    { name: 'Austria', selected: true },
    { name: 'Australia', selected: false },
    { name: 'Argentina', selected: false }
  ];

  programs: Program[] = [
    {
      id: '1',
      title: 'Study Abroad in Melbourne',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712',
      locations: ['Melbourne, Australia'],
      season: 'FALL, SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '2',
      title: 'Study Abroad in Melbourne',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712',
      locations: ['Melbourne, Australia'],
      season: 'FALL, SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '3',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712',
      locations: ['Sydney, Australia'],
      season: 'SUMMER',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '4',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712',
      locations: ['London, England'],
      season: 'FALL',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '5',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712',
      locations: ['FALL, SPRING'],
      season: 'SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    },
    {
      id: '6',
      title: 'Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712',
      locations: ['Queensland, Australia'],
      season: 'SPRING',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.'
    }
  ];

  toggleCountry(country: any) {
    country.selected = !country.selected;
    this.updateSelectedCountries();
  }

  updateSelectedCountries() {
    this.selectedCountries = this.countries
      .filter(c => c.selected)
      .map(c => c.name);
  }

  removeFilter(country: string) {
    const countryObj = this.countries.find(c => c.name === country);
    if (countryObj) {
      countryObj.selected = false;
      this.updateSelectedCountries();
    }
  }

  resetFilters() {
    this.countries.forEach(c => c.selected = false);
    this.selectedCountries = [];
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  toggleSort() {
    this.showSort = !this.showSort;
  }

  selectSort(option: string) {
    this.sortBy = option;
    this.showSort = false;
  }
}
