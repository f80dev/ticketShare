import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ConfigService} from '../config.service';
import {MatSnackBar} from '@angular/material';
import {ApiService} from '../api.service';
import {Meta} from '@angular/platform-browser';
import {$$, subscribe_socket,showMessage} from '../tools';
import {Socket, SocketIoModule} from "ngx-socket-io";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {


  constructor(
              public meta: Meta,
              public api: ApiService,
              public toast: MatSnackBar,
              public router: Router,
              public socket:Socket,
              public config: ConfigService,
              public _location: Location,
              public route: ActivatedRoute) {
  }


  refresh(){
    $$("Récupération du client");
    if(localStorage.getItem("address")){
      this.api.getuser(localStorage.getItem("address")).subscribe((r: any) => {
        if(r!=null)
          this.config.user=r;
      });
    }
  }

  ngOnInit() {
        this.config.refresh_callback=this.refresh;
        this.refresh();
        subscribe_socket(this,"refresh_balance",()=>{
          this.config.reload_user();
        });
        subscribe_socket(this,"refresh_event");
        subscribe_socket(this,"refresh_error",(event_name,data)=>{
          showMessage(this,data.message);
        });
  }







  informe_copy() {
    showMessage(this,"Adresse copiée");
  }



  openEvent(_evt) {
    this.router.navigate(["mytickets"],{queryParams:{event:_evt._id}})
  }

  openFAQ() {
    open("../faq.html","blank");
  }
}
