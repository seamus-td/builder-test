import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
  ,standalone: true,
  imports: [FormsModule]
})
export class SettingsPanelComponent {
  darkMode = false;
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }
}
