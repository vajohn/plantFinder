import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPlantsComponent } from './filter-plants.component';

describe('FilterPlantsComponent', () => {
  let component: FilterPlantsComponent;
  let fixture: ComponentFixture<FilterPlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPlantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
