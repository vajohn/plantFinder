import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPlantsComponent } from './all-plants/all-plants.component';
import { FilterPlantsComponent } from './filter-plants/filter-plants.component';
import {PlantsListResolver} from '../../resolvers/plant-list.resolver';
import {ListsRoutingModule} from './list.routing';
import {MaterialModule} from '../../material.module';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [AllPlantsComponent, FilterPlantsComponent],
  providers: [ PlantsListResolver ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
  ]
})
export class ListsModule { }
