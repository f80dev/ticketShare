import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {Location} from '@angular/common';
import {ConfigService} from '../config.service';
import {MatSidenav, MatSnackBar} from '@angular/material';
import {ApiService} from '../api.service';
import {Meta} from '@angular/platform-browser';
import {$$, subscribe_socket,showMessage} from '../tools';

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
        this.config.refresh_callback=this.refresh;
        this.refresh();
        subscribe_socket(this,"refresh_event");
  }







  informe_copy() {
    showMessage(this,"Adresse copiée");
  }



  openEvent(_evt) {
    this.router.navigate(["mytickets"],{queryParams:{event:_evt._id}})
  }
}
