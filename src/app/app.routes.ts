import { Routes } from "@angular/router";
import { FindProgramComponent } from "./pages/find-program/find-program.component";

export const routes: Routes = [
  { path: "", component: FindProgramComponent },
  { path: "find-program", component: FindProgramComponent },
  { path: "**", redirectTo: "" },
];
