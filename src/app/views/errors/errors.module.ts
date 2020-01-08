import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P404Component } from './p404/p404.component';
import { P505Component } from './p505/p505.component';



@NgModule({
  declarations: [P404Component, P505Component],
  imports: [
    CommonModule
  ]
})
export class ErrorsModule { }
