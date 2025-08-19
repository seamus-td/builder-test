import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
  ,standalone: true,
  imports: [RouterModule]
})
export class SidebarComponent {
  links = [
    { label: 'Home', route: '/' },
    { label: 'Programs', route: '/programs' },
    { label: 'Settings', route: '/settings' }
  ];
}
