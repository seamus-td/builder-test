import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/program-finder/program-finder.component").then(
        (m) => m.ProgramFinderComponent,
      ),
  },
  {
    path: "programs",
    loadComponent: () =>
      import("./pages/program-finder/program-finder.component").then(
        (m) => m.ProgramFinderComponent,
      ),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
