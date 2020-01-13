import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {Location} from '@angular/common';
import {ConfigService} from '../config.service';
import {MatSnackBar} from '@angular/material';
import {ApiService} from '../api.service';
import {Meta} from '@angular/platform-browser';
import {$$, subscribe_socket,showMessage} from '../tools';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private routeData;

  constructor(
              public meta: Meta,
              public api: ApiService,
              public toast: MatSnackBar,
              public router: Router,
              public config: ConfigService,
              public _location: Location,
              public route: ActivatedRoute) {
  }




  refresh(){
    if(localStorage.getItem("address")){
      this.api.getuser(localStorage.getItem("address")).subscribe((r: any) => {
        if(r!=null)
          this.config.user=r;
      });
    }
  }

  ngOnInit() {
      this.analyse_params((p: any) => {
        this.config.refresh_callback=this.refresh;
        this.refresh();
        subscribe_socket(this,"refresh_event");
      });
  }



  analyse_params(func) {
    var url=this._location.path();
    localStorage.setItem('firsturl', url);
    if(url!=null && url.indexOf("?")>0) {
      url= this._location.path().split("?")[1];
      $$('Récupération des paramètres', url);
      if (this.config.params == null) {
        this.config.params = {};
        if(url.indexOf("event=")>-1)this.config.params["event"]=url.split("event=")[1].split("&")[0];
      }
    }
    $$('Netoyage de l\'url de lancement:' + this._location.path());
    this._location.replaceState(this._location.path().split('?')[0], '');
    this._location.replaceState(this._location.path().split('/home')[0], '');

    func(this.config.params);
  }








  informe_copy() {
    showMessage(this,"Adresse copiée");
  }


  send_codes() {
    this.api.resend(this.config.user._id).subscribe(()=>{
      showMessage(this,"Consulter votre messagerie");
    })
  }

  openEvent(_evt) {
    this.router.navigate(["mytickets"],{queryParams:{event:_evt._id}})
  }
}
