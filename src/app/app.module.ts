import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { environment } from '../environments/environment';
import { StoreComponent } from './store/store.component';
import { EntranceComponent } from './entrance/entrance.component';
import { OrderByPipe } from './order-by.pipe';
import { TransPipe } from './trans.pipe';
import { SafePipe } from './safe.pipe';
import {
  MAT_DIALOG_DATA,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTabsModule,
  MatToolbarModule
} from "@angular/material";

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {ImageCropperModule} from "ngx-image-cropper";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {FlipModule} from "ngx-flip";
import {ClipboardModule, ClipboardService} from "ngx-clipboard";
import {NgxSocialButtonModule, SocialServiceConfig} from "ngx-social-button";
import {WebcamModule} from "ngx-webcam";
import {QRCodeModule} from "angular2-qrcode";
import { AboutComponent } from './about/about.component';
import { CguComponent } from './cgu/cgu.component';
import { TutoComponent } from './tuto/tuto.component';
import { TimerComponent } from './timer/timer.component';
import {ApiService} from "./api.service";
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeviceDetectorModule} from "ngx-device-detector";
import { PromptComponent } from './prompt/prompt.component';
import { PlacesComponent } from './places/places.component';
import { ValidateComponent } from './validate/validate.component';
import { ScannerComponent } from './scanner/scanner.component';
import { AdminComponent } from './admin/admin.component';
import { HourglassComponent } from './hourglass/hourglass.component';
import { TicketComponent } from './ticket/ticket.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { EventComponent } from './event/event.component';
import { ShareComponent } from './share/share.component';
import { FilterPipe } from './filter.pipe';
import { MyeventsComponent } from './myevents/myevents.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoginComponent } from './login/login.component';
import {NgxJsonViewerModule} from "ngx-json-viewer";
import {getAuthServiceConfigs} from "./tools";
import { RefundComponent } from './refund/refund.component';
import { EventeditorComponent } from './eventeditor/eventeditor.component';
import {NgxPayPalModule} from "ngx-paypal";
import { PaymentComponent } from './payment/payment.component';
import { SettingsComponent } from './settings/settings.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PromoComponent } from './promo/promo.component';
import { FaqsComponent } from './faqs/faqs.component';
import { OfferComponent } from './offer/offer.component';
import { SearchComponent } from './search/search.component';
import {MonacoEditorModule} from "ngx-monaco-editor";
import { FaqLinkComponent } from './faq-link/faq-link.component';
import { DateComponent } from './date/date.component';
import { IntroComponent } from './intro/intro.component';
import { DevelopperComponent } from './developper/developper.component';
import { CancelComponent } from './cancel/cancel.component';
import { StatsComponent } from './stats/stats.component';
import { ImporterComponent } from './importer/importer.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { PlurielPipe } from './pluriel.pipe';

const config: SocketIoConfig = { url: environment.domain_server, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    EntranceComponent,
    OrderByPipe,
    TransPipe,
    SafePipe,
    AboutComponent,
    CguComponent,
    TutoComponent,
    TimerComponent,
    HomeComponent,
    PromptComponent,
    PlacesComponent,
    ValidateComponent,
    ScannerComponent,
    AdminComponent,
    HourglassComponent,
    TicketComponent,
    MyticketsComponent,
    EventComponent,
    ShareComponent,
    FilterPipe,
    MyeventsComponent,
    WalletComponent,
    LoginComponent,
    RefundComponent,
    EventeditorComponent,
    PaymentComponent,
    SettingsComponent,
    ImageSelectorComponent,
    WelcomeComponent,
    PromoComponent,
    FaqsComponent,
    OfferComponent,
    SearchComponent,
    FaqLinkComponent,
    DateComponent,
    IntroComponent,
    DevelopperComponent,
    CancelComponent,
    StatsComponent,
    ImporterComponent,
    PlurielPipe
  ],
  entryComponents: [
    PromptComponent,
    ImageSelectorComponent
  ],
  imports: [
    NgxPayPalModule,
    BrowserModule,
    NgxJsonViewerModule,
    MatSidenavModule,
    MatSliderModule,
    PickerModule,

    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ImageCropperModule,
    SocketIoModule.forRoot(config),
    MatDialogModule,
    FlipModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    QRCodeModule,
    ClipboardModule,
    NgxSocialButtonModule,
    BrowserModule,
    MatGridListModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule,
    MatTabsModule,
    WebcamModule,
    MatCheckboxModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    DeviceDetectorModule.forRoot(),
    MatSortModule,
    GoogleChartsModule
  ],
  providers: [
    ApiService,TransPipe,SafePipe,ClipboardService,PlurielPipe,
    {provide: SocialServiceConfig,useFactory: getAuthServiceConfigs},
    {provide: MAT_DIALOG_DATA, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
