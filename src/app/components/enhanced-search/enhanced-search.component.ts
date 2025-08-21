import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enhanced-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <div class="relative">
        <input
          type="text"
          [(ngModel)]="searchQuery"
          (input)="onSearchInput()"
          placeholder="I"
          class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
        />
        <i class="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">
          search
        </i>
      </div>
    </div>
  `
})
export class EnhancedSearchComponent {
  searchQuery = signal('');
  @Output() search = new EventEmitter<string>();

  onSearchInput() {
    this.search.emit(this.searchQuery());
  }
}
