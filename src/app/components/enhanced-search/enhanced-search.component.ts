import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enhanced-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enhanced-search.component.html',
  styleUrls: ['./enhanced-search.component.scss']
})
export class EnhancedSearchComponent {
  searchQuery = signal('');
  @Output() search = new EventEmitter<string>();

  onSearchInput() {
    this.search.emit(this.searchQuery());
  }
}
