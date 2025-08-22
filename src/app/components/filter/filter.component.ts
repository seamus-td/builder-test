import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Filter, FilterOption } from "./filter.model";

@Component({
  selector: "app-filter",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./filter.component.html",
  styleUrl: "./filter.component.scss",
})
export class FilterComponent {
  @Input() filter!: Filter;
  @Output() filterChange = new EventEmitter<Filter>();
  @Output() optionToggle = new EventEmitter<{
    filterId: string;
    optionValue: string;
    selected: boolean;
  }>();

  toggleExpanded(): void {
    this.filter.isExpanded = !this.filter.isExpanded;
    this.filterChange.emit(this.filter);
  }

  toggleOption(option: FilterOption): void {
    const isSelected = this.filter.selectedOptions.includes(option.value);
    if (isSelected) {
      this.filter.selectedOptions = this.filter.selectedOptions.filter(
        (value) => value !== option.value
      );
    } else {
      this.filter.selectedOptions.push(option.value);
    }

    this.optionToggle.emit({
      filterId: this.filter.id,
      optionValue: option.value,
      selected: !isSelected,
    });

    this.filterChange.emit(this.filter);
  }

  isOptionSelected(option: FilterOption): boolean {
    return this.filter.selectedOptions.includes(option.value);
  }
}
