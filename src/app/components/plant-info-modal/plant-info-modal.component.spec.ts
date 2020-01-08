import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfoModalComponent } from './plant-info-modal.component';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatDialogModule, MatDialogRef} from '@angular/material';

describe('PlantInfoModalComponent', () => {
  let component: PlantInfoModalComponent;
  let fixture: ComponentFixture<PlantInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantInfoModalComponent ],
      imports: [MatDialogModule,  MatButtonModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
