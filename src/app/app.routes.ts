import { Routes } from "@angular/router";
import { ProgramFinderComponent } from "./pages/program-finder/program-finder.component";

export const routes: Routes = [
  { path: "", redirectTo: "/programs", pathMatch: "full" },
  { path: "programs", component: ProgramFinderComponent },
  { path: "**", redirectTo: "/programs" },
];
