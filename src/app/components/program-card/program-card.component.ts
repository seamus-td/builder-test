import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Program } from "./program-card.model";

@Component({
  selector: "app-program-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
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
        <!-- Title with exact Figma styling -->
        <h3 class="text-lg font-bold text-gray-900 mb-3 leading-7 line-clamp-2">
          {{ program.title }}
        </h3>

        <!-- Location with material icon -->
        <div class="flex items-center mb-4">
          <i class="material-icons text-gray-600 mr-2" style="font-size: 16px;">location_on</i>
          <span class="text-sm text-gray-600">{{ program.location }}</span>
        </div>

        <!-- Season/Terms -->
        <div class="text-sm text-gray-500 mb-4 uppercase tracking-wide">
          {{ program.season }}
        </div>

        <!-- Description -->
        <p class="text-sm text-gray-700 line-clamp-3 leading-5">
          {{ program.description }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
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
