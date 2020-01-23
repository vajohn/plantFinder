import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterPlantsComponent} from './filter-plants.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material.module';
import {PlantsDataService} from '../../../services/plants-data.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TableComponent} from '../../../components/table/table.component';

describe('FilterPlantsComponent', () => {
  let component: FilterPlantsComponent;
  let fixture: ComponentFixture<FilterPlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPlantsComponent, TableComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule, HttpClientTestingModule,
        FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [PlantsDataService]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create filter plants', () => {
    expect(component).toBeTruthy();
  });
});
