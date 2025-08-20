import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-university-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="h-16 bg-white shadow-sm border-b border-gray-100">
      <div class="flex items-center justify-between h-full px-6 max-w-7xl mx-auto">
        <!-- Logo and University Name -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span class="text-white font-bold text-sm">TU</span>
          </div>
          <h1 class="text-xl font-bold text-gray-900">TERRADOTTA UNIVERSITY</h1>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <a href="#" class="text-gray-600 hover:text-gray-900 text-base">Programs</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 text-base">Health&Safety</a>
          <a href="#" class="text-gray-700 font-semibold text-base border-b-2 border-blue-600 pb-1">
            Recommended Programs
          </a>
        </nav>

        <!-- Right side icons -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="text-gray-600 hover:text-gray-900">
            <span class="material-icons text-2xl">notifications</span>
          </button>
          
          <!-- User Avatar -->
          <div class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/1429005494c529ce932ce1527d609b135d077cc7?width=64" 
              alt="User profile" 
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  `
})
export class UniversityHeaderComponent {}
