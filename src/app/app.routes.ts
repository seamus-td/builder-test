import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/program-finder/program-finder.component').then(c => c.ProgramFinderComponent)
  },
  {
    path: 'programs',
    loadComponent: () => import('./pages/program-finder/program-finder.component').then(c => c.ProgramFinderComponent)
  }
];
