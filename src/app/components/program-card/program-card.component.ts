import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Program {
  id: string;
  title: string;
  image: string;
  locations: string[];
  season: string;
  description: string;
  featured?: boolean;
}

@Component({
  selector: 'app-program-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
         style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -2px rgba(0, 0, 0, 0.10);">
      <!-- Image Section -->
      <div class="relative">
        <img
          [src]="program.image"
          [alt]="program.title"
          class="w-full h-48 object-cover"
        />

        <!-- Featured Badge -->
        <div *ngIf="program.featured" class="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
          Featured
        </div>

        <!-- Action Buttons -->
        <div class="absolute top-2 right-2 flex gap-2">
          <button class="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-opacity">
            <i class="material-icons text-gray-700 text-base">favorite_border</i>
          </button>
          <button class="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-opacity">
            <i class="material-icons text-gray-700 text-base">share</i>
          </button>
        </div>
      </div>

      <!-- Content Section -->
      <div class="px-4 py-4">
        <!-- Title with exact spacing -->
        <h3 class="text-lg font-bold leading-7 mb-3 line-clamp-2" style="color: #1F2937;">
          {{ program.title }}
        </h3>

        <!-- Location with proper icon styling -->
        <div class="flex items-center mb-4">
          <i class="material-icons text-base mr-1" style="color: #4B5563; font-size: 16px;">location_on</i>
          <span class="text-sm" style="color: #4B5563;">{{ program.locations[0] }}</span>
          <div *ngIf="program.locations.length > 1" class="text-sm text-blue-600 font-semibold ml-1">
            + {{ program.locations.length - 1 }} more
          </div>
        </div>

        <!-- Season with proper spacing -->
        <div class="text-sm mb-4" style="color: #6B7280;">
          {{ program.season }}
        </div>

        <!-- Description with exact line height -->
        <p class="text-sm line-clamp-2" style="color: #374151; line-height: 20px;">
          {{ program.description }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProgramCardComponent {
  @Input() program!: Program;
}
