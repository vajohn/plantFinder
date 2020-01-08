import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultLayoutComponent} from './layouts/default-layout';
import {P404Component} from './views/errors/p404/p404.component';
import {P505Component} from './views/errors/p505/p505.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/lists/lists.module').then(m => m.ListsModule)
      },
      {
        path: 'errors',
        loadChildren: () => import('./views/errors/errors.module').then(m => m.ErrorsModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./views/forms/group-forms.module').then(m => m.GroupFormsModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
