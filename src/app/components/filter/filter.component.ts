import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

export interface FilterOption {
  value: string;
  label: string;
  checked?: boolean;
}

@Component({
  selector: "app-filter",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent {
  @Input() title: string = "";
  @Input() options: FilterOption[] = [];
  @Input() isExpanded: boolean = false;
  @Output() optionsChange = new EventEmitter<FilterOption[]>();
  @Output() expandedChange = new EventEmitter<boolean>();

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    this.expandedChange.emit(this.isExpanded);
  }

  onOptionChange(option: FilterOption, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    option.checked = checked;
    this.optionsChange.emit(this.options);
  }
}
