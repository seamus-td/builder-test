import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgramCardComponent } from './components/program-card/program-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgramCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fusion-angular-tailwind-starter');
}
