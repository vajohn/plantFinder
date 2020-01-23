import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AllPlantsComponent} from './all-plants.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ComponentsModule} from '../../../components/components.module';
import {MaterialModule} from '../../../material.module';
import {PlantsDataService} from '../../../services/plants-data.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AllPlantsComponent', () => {
  let component: AllPlantsComponent;
  let fixture: ComponentFixture<AllPlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllPlantsComponent],
      imports: [
        MaterialModule,
        ComponentsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule, HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [PlantsDataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', async(() => {
    fixture = TestBed.createComponent(AllPlantsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Plant Finder');
  }));

  it('should create all plants', () => {
    expect(component).toBeTruthy();
  });
});
