import { Routes } from "@angular/router";
import { FindProgramsComponent } from "./pages/find-programs/find-programs.component";

export const routes: Routes = [
  { path: "", component: FindProgramsComponent },
  { path: "find-programs", component: FindProgramsComponent },
];
