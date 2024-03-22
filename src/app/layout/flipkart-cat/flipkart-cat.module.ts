import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlipkartCatRoutingModule } from './flipkart-cat-routing.module';
import { FlipkartCatComponent } from './flipkart-cat/flipkart-cat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FlipkartCatComponent
  ],
  imports: [
    CommonModule,
    FlipkartCatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FlipkartCatModule { }
