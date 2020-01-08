import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AddNewPlantComponent} from './add-new-plant/add-new-plant.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'add-plant'
      },
      {
        path: 'add-plant',
        component: AddNewPlantComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
