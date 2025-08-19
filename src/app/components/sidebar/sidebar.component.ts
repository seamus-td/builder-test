import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  links = [
    { label: 'Home', route: '/' },
    { label: 'Programs', route: '/programs' },
    { label: 'Settings', route: '/settings' }
  ];
}
