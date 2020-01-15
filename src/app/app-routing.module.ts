import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreComponent} from "./store/store.component";
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {PlacesComponent} from "./places/places.component";
import {ValidateComponent} from "./validate/validate.component";
import {AdminComponent} from "./admin/admin.component";
import {MyticketsComponent} from "./mytickets/mytickets.component";
import {ShareComponent} from "./share/share.component";
import {MyeventsComponent} from "./myevents/myevents.component";
import {WalletComponent} from "./wallet/wallet.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'store', component: StoreComponent},
  { path: 'home', component: StoreComponent},
  { path: 'about', component: AboutComponent},
  { path: 'myevents', component: MyeventsComponent},
  { path: 'places', component: PlacesComponent},
  { path: 'mytickets', component: MyticketsComponent},
  { path: 'share', component: ShareComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent},
  { path: 'FAQ', redirectTo: "https://faq.ticketshare.f80.fr"},
  { path: 'wallet', component: WalletComponent},
  { path: 'validate', component: ValidateComponent},
  { path: '', component: StoreComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
