import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {subscribe_socket} from "../tools";
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
    this.router.navigate(["places"],{queryParams:{event:event._id}});
  }

  validate(event:any){
    this.router.navigate(["validate"],{queryParams:{event:event._id}})
  }

  fictif(){
    this.message="Fabrication d'un événement fictif"
    this.api._get("test/event").subscribe(()=>{
      this.message="";
      this.refresh();
    });
  }
}
