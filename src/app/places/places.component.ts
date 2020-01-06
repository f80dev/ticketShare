import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ConfigService} from "../config.service";
import { Location } from '@angular/common';
import {checkLogin, subscribe_socket} from "../tools";
import {MatSnackBar} from "@angular/material";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {

  tickets:any[]=[];
  message="";

  constructor(public api: ApiService,
              public toast:MatSnackBar,
              public socket:Socket,
              public router:Router,
              public config:ConfigService,
              private _location: Location,
              public route: ActivatedRoute) {

  }


  refresh(){
    this.message="Récupération des places diponibles";
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.api.available(params.get("event"),localStorage.getItem("address")).subscribe((r:any)=>{
      this.message="";
      if(r!=null){
        if(r.length==0){
          this._location.back();
          this.toast.open("Plus de place disponible");
        } else {
          this.tickets=r;
        }
      }
    },()=>{
      this.toast.open("Cet événement n'est plus disponible");
      this._location.back();
    });
  }





  ngOnInit() {
    checkLogin(this.router);
    this.refresh();
    subscribe_socket(this,"refresh_buy");
  }




  buy(tickets:any){
    var rc=[];
    for(let ticket of tickets)
      rc.push(ticket.value)


    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.message="Validation de l'achat";
    this.api.buy(localStorage.getItem("address"),rc,params.get("event")).subscribe((r:any)=>{
      this.message="";
      if(r!=null){
        this.toast.open("Achat confirmé");
        this.router.navigate(["home"]);
      }
    },(err)=>{
      this.message="";
      this.toast.open("Achat annulé");
      this._location.back();
    })
  }

}
