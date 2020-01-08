import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AllPlantsComponent} from './all-plants/all-plants.component';
import {FilterPlantsComponent} from './filter-plants/filter-plants.component';
import {PlantsListResolver} from '../../resolvers/plant-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: AllPlantsComponent ,
        resolve: {
          PlantsListResolver
        }
      },
      {
        path: 'filter',
        component: FilterPlantsComponent ,
        resolve: {
          PlantsListResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
