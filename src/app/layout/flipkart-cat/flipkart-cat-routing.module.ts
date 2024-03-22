import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlipkartCatComponent } from './flipkart-cat/flipkart-cat.component';

const routes: Routes = [
  {path: "", component: FlipkartCatComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlipkartCatRoutingModule { }
