import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {PlantInfoModalComponent} from './plant-info-modal/plant-info-modal.component';
import {PaginationComponent} from './pagination/pagination.component';
import {MaterialModule} from '../material.module';
import {LoaderComponent} from './loader/loader.component';
import {ToastComponent} from './toast/toast.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    PaginationComponent,
    PlantInfoModalComponent,
    LoaderComponent,
    ToastComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    PlantInfoModalComponent,
    ToastComponent
  ],
  exports: [
    PaginationComponent,
    LoaderComponent,
    TableComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class ComponentsModule {
}
