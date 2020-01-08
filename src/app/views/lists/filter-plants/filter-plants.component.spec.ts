import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPlantsComponent } from './filter-plants.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ComponentsModule} from '../../../components/components.module';
import {MaterialModule} from '../../../material.module';

describe('FilterPlantsComponent', () => {
  let component: FilterPlantsComponent;
  let fixture: ComponentFixture<FilterPlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPlantsComponent ],
      imports: [MaterialModule, ComponentsModule, RouterTestingModule, BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('should test the filter table', (done) => {

    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const tableRows = fixture.debugElement.nativeElement.querySelectorAll('tr');
      // Header row
      const headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('Common name');

      // Data rows
      // todo test on data on rows
      done();
    });
  });
});
