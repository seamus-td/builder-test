import { Routes } from "@angular/router";
import { ProgramCardComponent } from "./components/program-card/program-card.component";

export const routes: Routes = [
  { path: "", component: ProgramCardComponent },
  { path: "find-programs", component: ProgramCardComponent },
];
