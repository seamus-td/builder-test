import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

interface Program {
  id: string;
  title: string;
  image: string;
  location: string;
  terms: string;
  description: string;
  featured?: boolean;
}

@Component({
  selector: "app-program-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="w-full max-w-sm bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -2px rgba(0, 0, 0, 0.10);"
    >
      <!-- Image Section -->
      <div class="relative">
        <img
          [src]="program.image"
          [alt]="program.title"
          class="w-full h-48 object-cover"
        />
      </div>

      <!-- Content Section -->
      <div class="p-4">
        <!-- Title -->
        <h3 class="text-lg font-bold leading-7 mb-3 text-gray-900">
          {{ program.title }}
        </h3>

        <!-- Location with icon -->
        <div class="flex items-center mb-4">
          <span class="material-icons text-gray-600 mr-2" style="font-size: 16px;">location_on</span>
          <span class="text-sm text-gray-600">{{ program.location }}</span>
        </div>

        <!-- Terms -->
        <div class="text-sm text-gray-500 mb-4 uppercase">
          {{ program.terms }}
        </div>

        <!-- Description -->
        <p class="text-sm text-gray-700 leading-5 line-clamp-3">
          {{ program.description }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class ProgramCardComponent {
  @Input() program!: Program;
}
