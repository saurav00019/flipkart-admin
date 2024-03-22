import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login/login.component';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./layout/login/login.module').then(m=>m.LoginModule)},
  {path: 'flipkart-cat', loadChildren:()=>import('./layout/flipkart-cat/flipkart-cat.module').then(m=>m.FlipkartCatModule)},
  {path: "sign-up", loadChildren: ()=> import("./layout/sign-up/sign-up.module").then(m=> m.SignUpModule)}

  // {path: 'login', component: LoginComponent},

  // {path: "", redirectTo: "layout/login/login", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
