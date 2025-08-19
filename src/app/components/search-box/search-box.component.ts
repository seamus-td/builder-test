import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  query = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.query);
  }
}
