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
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
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
