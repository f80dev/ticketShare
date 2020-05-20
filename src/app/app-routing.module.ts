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
import {RefundComponent} from "./refund/refund.component";
import {EventeditorComponent} from "./eventeditor/eventeditor.component";
import {PaymentComponent} from "./payment/payment.component";
import {SettingsComponent} from "./settings/settings.component";
import {PromoComponent} from "./promo/promo.component";
import {FaqsComponent} from "./faqs/faqs.component";
import {OfferComponent} from "./offer/offer.component";
import {SearchComponent} from "./search/search.component";
import {CguComponent} from "./cgu/cgu.component";
import {DevelopperComponent} from "./developper/developper.component";
import {CancelComponent} from "./cancel/cancel.component";
import {StatsComponent} from "./stats/stats.component";

const routes: Routes = [
  { path: 'store', component: StoreComponent},
  { path: 'home', component: StoreComponent},
  { path: 'about', component: AboutComponent},
  { path: 'myevents', component: MyeventsComponent},
  { path: 'places', component: PlacesComponent},
  { path: 'mytickets', component: MyticketsComponent},
  { path: 'share', component: ShareComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'refund', component: RefundComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'eventeditor', component: EventeditorComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'promo', component: PromoComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: 'offer', component: OfferComponent},
  { path: 'stats', component: StatsComponent},
  { path: 'search', component: SearchComponent},
  { path: 'cancel', component: CancelComponent},
  { path: 'developper', component: DevelopperComponent},
  { path: 'dev', component: DevelopperComponent},
  { path: 'login', component: LoginComponent},
  { path: 'about/cgu', component: CguComponent},
  { path: 'about', component: AboutComponent},
  { path: 'faq', component: FaqsComponent},
  { path: 'faq/:open', component: FaqsComponent},
  { path: 'wallet', component: WalletComponent},
  { path: 'validate', component: ValidateComponent},
  { path: '', component: SearchComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
