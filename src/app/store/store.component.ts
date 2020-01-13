import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {subscribe_socket,tirage} from "../tools";
import {Socket} from "ngx-socket-io";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {

  events=[];
  message="";

  constructor(public api:ApiService,
              public config:ConfigService,
              public socket:Socket,
              public toast:MatSnackBar,
              public route:ActivatedRoute,
              public router:Router) {
  }

  refresh(){
    this.api.getevents(localStorage.getItem("address")).subscribe((r:any)=>{
      this.events=r;
    });
  }

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    if(params.get("event"))
      this.router.navigate(["places"],{queryParams:{event:params.get("event")}});
    this.refresh();
    subscribe_socket(this,"refresh_store");
  }

  buy(event: any) {
    this.router.navigate(["places"],{queryParams:{event:event._id,etherprice:event.etherprice}});
  }

  validate(event:any){
    this.router.navigate(["validate"],{queryParams:{event:event._id}})
  }

  /**
   *
   */
  fictif(){
    this.message="Fabrication d'un événement fictif. Cela peut être long ..."
    var index=tirage(4);
    var event=["demo","bicep","foot","musee","pixies"][index];
    this.api._get("add_event/"+event+"?format=json").subscribe(()=>{
      this.message="";
      this.refresh();
    });
  }
}
