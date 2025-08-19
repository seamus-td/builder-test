import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProgramCardComponent } from "../../components/program-card/program-card.component";
import { Program } from "../../components/program-card/program-card.model";

@Component({
  selector: "app-find-programs",
  standalone: true,
  imports: [CommonModule, FormsModule, ProgramCardComponent],
  templateUrl: "./find-programs.component.html",
  styleUrls: ["./find-programs.component.css"],
})
export class FindProgramsComponent {
  // Filter state
  acceptingApplications = signal(false);
  searchCountry = signal("");
  selectedCountries = signal(["Austria"]);
  searchQuery = signal("");

  // Tab state
  activeTab = signal("all");

  // Sort state
  sortBy = signal("alphabetical-az");

  // Programs data
  programs = signal<Program[]>([
    {
      id: "1",
      title: "Study Abroad in Melbourne",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712",
      locations: ["Melbourne, Australia"],
      season: "FALL, SPRING",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
    },
    {
      id: "2",
      title: "Study Abroad in Melbourne",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712",
      locations: ["Melbourne, Australia"],
      season: "FALL, SPRING",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
    },
    {
      id: "3",
      title:
        "Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712",
      locations: ["Sydney, Australia"],
      season: "SUMMER",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
    },
    {
      id: "4",
      title:
        "Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712",
      locations: ["London, England"],
      season: "FALL",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
    },
    {
      id: "5",
      title:
        "Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712",
      locations: ["FALL, SPRING"],
      season: "SPRING",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
    },
    {
      id: "6",
      title:
        "Study Abroad Program In This Country If a Longer Title It Goes Into 2 Lines",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e5223a9b77db3fc22185092339e2229154d73414?width=712",
      locations: ["Queensland, Australia"],
      season: "SPRING",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
    },
  ]);

  countries = [
    { name: "Afghanistan", selected: false },
    { name: "America", selected: false },
    { name: "Austria", selected: true },
    { name: "Australia", selected: false },
    { name: "Argentina", selected: false },
  ];

  filteredPrograms() {
    return this.programs();
  }

  toggleCountry(countryName: string) {
    const country = this.countries.find((c) => c.name === countryName);
    if (country) {
      country.selected = !country.selected;
      const selected = this.countries
        .filter((c) => c.selected)
        .map((c) => c.name);
      this.selectedCountries.set(selected);
    }
  }

  removeCountryFilter(countryName: string) {
    const country = this.countries.find((c) => c.name === countryName);
    if (country) {
      country.selected = false;
      const selected = this.countries
        .filter((c) => c.selected)
        .map((c) => c.name);
      this.selectedCountries.set(selected);
    }
  }

  resetFilters() {
    this.countries.forEach((c) => (c.selected = false));
    this.selectedCountries.set([]);
    this.acceptingApplications.set(false);
    this.searchCountry.set("");
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortBy.set(select.value);
  }
}
