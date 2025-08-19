import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  filters = ['All', 'Active', 'Completed'];
  selected = 'All';

  selectFilter(filter: string) {
    this.selected = filter;
  }
}
