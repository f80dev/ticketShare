import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ConfigService} from "../config.service";
import { Location } from '@angular/common';
import {checkLogin} from "../tools";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {

  tickets:any[]=[];
  hourglass=false;

  constructor(public api: ApiService,
              public toast:MatSnackBar,
              public router:Router,
              public config:ConfigService,
              private _location: Location,
              public route: ActivatedRoute) {

  }


  refresh(){
    this.hourglass=true;
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.api.available(params.get("event"),localStorage.getItem("address")).subscribe((r:any)=>{
      this.hourglass=false;
      if(r!=null)
        this.tickets=r;
    });
  }





  ngOnInit() {
    checkLogin(this.router);
    this.refresh();
  }




  buy(ticket:any){
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.hourglass=true;
    this.api.buy(localStorage.getItem("address"),ticket._id,params.get("event")).subscribe((r:any)=>{
      this.hourglass=false;
      if(r!=null){
        this.toast.open("Achat confirmé");
        this.refresh();
      }
    })
  }

}
