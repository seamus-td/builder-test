import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  id: string;
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-6">
      <button
        *ngFor="let tab of tabs()"
        (click)="selectTab(tab.id)"
        [class]="getTabClasses(tab)"
      >
        {{ tab.label }}
      </button>
    </div>
  `
})
export class TabNavigationComponent {
  @Output() tabChange = new EventEmitter<string>();

  tabs = signal<Tab[]>([
    { id: 'all', label: 'All', active: true },
    { id: 'previously-viewed', label: 'Previously viewed', active: false },
    { id: 'saved', label: 'Saved', active: false }
  ]);

  selectTab(tabId: string) {
    this.tabs.update(tabs => 
      tabs.map(tab => ({ ...tab, active: tab.id === tabId }))
    );
    this.tabChange.emit(tabId);
  }

  getTabClasses(tab: Tab): string {
    const baseClasses = 'text-base font-medium py-2 px-1 transition-colors';
    if (tab.active) {
      return `${baseClasses} text-blue-600 border-b-2 border-blue-600 font-semibold`;
    }
    return `${baseClasses} text-gray-600 hover:text-gray-900`;
  }
}
