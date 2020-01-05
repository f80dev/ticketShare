import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ConfigService} from "../config.service";
import { Location } from '@angular/common';
import {checkLogin, subscribe_socket} from "../tools";
import {MatSnackBar} from "@angular/material";

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
      if(r!=null)
        this.tickets=r;
    });
  }





  ngOnInit() {
    checkLogin(this.router);
    this.refresh();
    subscribe_socket(this,"refresh_buy",this.refresh);
  }




  buy(ticket:any){
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.message="Validation de l'achat";
    this.api.buy(localStorage.getItem("address"),ticket._id,params.get("event")).subscribe((r:any)=>{
      this.message="";
      if(r!=null){
        this.toast.open("Achat confirmé");
        setTimeout(()=>{this.refresh();},500);
      }
    },(err)=>{
      this.message="";
      this.toast.open("Achat annulé");
    })
  }

}
