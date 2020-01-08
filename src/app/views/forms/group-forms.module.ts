import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewPlantComponent } from './add-new-plant/add-new-plant.component';
import {FormsRoutingModule} from './forms.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [AddNewPlantComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class GroupFormsModule { }
