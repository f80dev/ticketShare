import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreComponent} from "./store/store.component";
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {PlacesComponent} from "./places/places.component";
import {ValidateComponent} from "./validate/validate.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  { path: 'store', component: StoreComponent},
  { path: 'about', component: AboutComponent},
  { path: 'home', component: HomeComponent},
  { path: 'places', component: PlacesComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'validate', component: ValidateComponent},
  { path: '', component: HomeComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
