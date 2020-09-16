import { Component, OnInit,Input } from '@angular/core';
import {Location} from '@angular/common';
import {ConfigService} from '../config.service';
import {MatSnackBar} from '@angular/material';
import {ApiService} from '../api.service';
import {Meta} from '@angular/platform-browser';
import {$$, subscribe_socket,showMessage} from '../tools';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  ethPrice=0;
  @Input("money") money=0;

  constructor(
              public meta: Meta,
              public api: ApiService,
              public toast: MatSnackBar,
              public router: Router,
              public socket:Socket,
              public config: ConfigService,
              public _location: Location) {
  }


  refresh(){
    $$("Récupération du client");
    if(localStorage.getItem("address")){
      this.api.getuser(localStorage.getItem("address")).subscribe((r: any) => {
        if(r!=null){
          $$("Mode connecté avec l'email : "+r.email);
          this.config.user=r;
        } else {
          $$("address de wallet inconnu");
        }
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
    this.router.navigate(["faqs"]);
  }
}
