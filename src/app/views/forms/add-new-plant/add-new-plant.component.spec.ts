import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPlantComponent } from './add-new-plant.component';
import {MaterialModule} from '../../../material.module';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule, By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormsRoutingModule} from '../forms.routing';

describe('AddNewPlantComponent', () => {
  let component: AddNewPlantComponent;
  let fixture: ComponentFixture<AddNewPlantComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPlantComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FormsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPlantComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('form'));
    element = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', async(() => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  }));

  it('should initiate the onSubmit method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    element = fixture.debugElement.query(By.css('button')).nativeElement;
    element.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));

  it('form should be valid', async(() => {
    component.addNewPlant.controls.common_name.setValue('abcd');
    component.addNewPlant.controls.bloom_time.setValue('abc');
    component.addNewPlant.controls.plant_type.setValue('abc');
    component.addNewPlant.controls.flower_color.setValue('abcd');
    component.addNewPlant.controls.soil_type.setValue('abc');
    component.addNewPlant.controls.habitat_value.setValue('abc');
    expect(component.addNewPlant.valid).toBeTruthy();
  }));

  it('form should be valid having only required information', async(() => {
    component.addNewPlant.controls.common_name.setValue('plant');
    component.addNewPlant.controls.bloom_time.setValue('abc');
    component.addNewPlant.controls.plant_type.setValue('abc');
    component.addNewPlant.controls.flower_color.setValue('orange');
    component.addNewPlant.controls.soil_type.setValue('');
    component.addNewPlant.controls.habitat_value.setValue('');
    expect(component.addNewPlant.valid).toBeTruthy();
  }));

  it('form should be invalid', async(() => {
    component.addNewPlant.controls.name.setValue('cat');
    component.addNewPlant.controls.time.setValue('');
    component.addNewPlant.controls.type.setValue('');
    component.addNewPlant.controls.color.setValue('red');
    expect(component.addNewPlant.valid).toBeFalsy();
  }));
});
