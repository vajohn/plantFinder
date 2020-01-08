import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPlantsComponent } from './all-plants/all-plants.component';
import { FilterPlantsComponent } from './filter-plants/filter-plants.component';



@NgModule({
  declarations: [AllPlantsComponent, FilterPlantsComponent],
  imports: [
    CommonModule
  ]
})
export class ListsModule { }
