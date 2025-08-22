import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ProgramFinderComponent } from "./program-finder.component";

describe("ProgramFinderComponent", () => {
  let component: ProgramFinderComponent;
  let fixture: ComponentFixture<ProgramFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramFinderComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default values", () => {
    expect(component.searchTerm()).toBe("");
    expect(component.selectedTab()).toBe("all");
    expect(component.sortBy()).toBe("alphabetical");
    expect(component.acceptingApplications()).toBeFalse();
    expect(component.filters().length).toBeGreaterThan(0);
  });

  it("should filter programs by search term", () => {
    component.searchTerm.set("paris");
    const filtered = component.filteredPrograms();
    expect(
      filtered.some((p) => p.title.toLowerCase().includes("paris")),
    ).toBeTrue();
  });

  it("should change sort order", () => {
    component.onSortChange("newest");
    expect(component.sortBy()).toBe("newest");
  });

  it("should change active tab", () => {
    component.onTabChange("saved");
    expect(component.selectedTab()).toBe("saved");
  });

  it("should track programs by id", () => {
    const program = {
      id: "test-1",
      title: "Test Program",
      image: "",
      locations: [],
      season: "",
      description: "",
    };
    expect(component.programTrackBy(0, program)).toBe("test-1");
  });
});
