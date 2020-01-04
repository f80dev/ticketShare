import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {

  events=[];
  hourglass: boolean=false;

  constructor(public api:ApiService,public config:ConfigService,public router:Router) {
  }

  refresh(){
    this.api.getevents(localStorage.getItem("address")).subscribe((r:any)=>{
      this.events=r;
    });
  }

  ngOnInit() {
   this.refresh();
  }

  buy(event: any) {
    this.router.navigate(["places"],{queryParams:{event:event._id}});
  }

  validate(event:any){
    this.router.navigate(["validate"],{queryParams:{event:event._id}})
  }

  fictif(){
    this.hourglass=true;
    this.api._get("test/event").subscribe(()=>{
      this.hourglass=false;
      this.refresh();
    });
  }
}
