import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FilterComponent } from "./filter.component";
import { Filter } from "./filter.model";

describe("FilterComponent", () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;

    // Set up test data
    component.filter = {
      id: "test-filter",
      title: "Test Filter",
      options: [
        { id: "1", label: "Option 1", value: "option1" },
        { id: "2", label: "Option 2", value: "option2" },
      ],
      selectedOptions: [],
      isExpanded: false,
    };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle expanded state", () => {
    expect(component.filter.isExpanded).toBeFalse();
    component.toggleExpanded();
    expect(component.filter.isExpanded).toBeTrue();
  });

  it("should toggle option selection", () => {
    const option = component.filter.options[0];
    expect(component.isOptionSelected(option)).toBeFalse();

    component.toggleOption(option);
    expect(component.isOptionSelected(option)).toBeTrue();

    component.toggleOption(option);
    expect(component.isOptionSelected(option)).toBeFalse();
  });
});
