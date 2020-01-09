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
  MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule, MatSortModule, MatStepperModule,
  MatToolbarModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {ImageCropperModule} from "ngx-image-cropper";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {FlipModule} from "ngx-flip";
import {ClipboardModule, ClipboardService} from "ngx-clipboard";
import {NgxSocialButtonModule} from "ngx-social-button";
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

const config: SocketIoConfig = { url: environment.socket_server, options: {} };

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
    MyeventsComponent
  ],
  entryComponents: [
    PromptComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatSliderModule,
    PickerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatSortModule
  ],
  providers: [
    ApiService,TransPipe,SafePipe,ClipboardService,
    {provide: MAT_DIALOG_DATA, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
