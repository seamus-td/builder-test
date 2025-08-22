import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FilterSidebarComponent } from "./filter-sidebar.component";
import { Filter } from "../filter/filter.model";

describe("FilterSidebarComponent", () => {
  let component: FilterSidebarComponent;
  let fixture: ComponentFixture<FilterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterSidebarComponent);
    component = fixture.componentInstance;

    // Set up test data
    component.filters = [
      {
        id: "terms",
        title: "Terms",
        options: [
          { id: "fall", label: "Fall", value: "fall" },
          { id: "spring", label: "Spring", value: "spring" },
        ],
        selectedOptions: [],
        isExpanded: false,
      },
    ];

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle accepting applications", () => {
    expect(component.acceptingApplications).toBeFalse();
    component.onAcceptingApplicationsChange();
    expect(component.acceptingApplications).toBeTrue();
  });

  it("should detect active filters", () => {
    expect(component.hasActiveFilters).toBeFalse();

    component.acceptingApplications = true;
    expect(component.hasActiveFilters).toBeTrue();
  });

  it("should reset all filters", () => {
    component.acceptingApplications = true;
    component.filters[0].selectedOptions = ["fall"];

    component.onResetFilters();

    expect(component.acceptingApplications).toBeFalse();
    expect(component.filters[0].selectedOptions).toEqual([]);
  });
});
