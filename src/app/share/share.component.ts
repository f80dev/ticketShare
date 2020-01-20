import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {$$,showMessage} from '../tools';


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.sass']
})
export class ShareComponent implements OnInit {
  ticketid: string = "";
  eventid: string = "";
  address="";
  message: string="";

  constructor(public config:ConfigService,
              public toast:MatSnackBar,
              public _location:Location,
              public route:ActivatedRoute,
              public api:ApiService) { }

  ngOnInit() {
    this.ticketid= this.route.snapshot.queryParamMap.get("ticket");
    this.eventid= this.route.snapshot.queryParamMap.get("event");
  }

  transfert(_to:string){
    this.message="Transfert en cours";
    this.api.transfert(this.config.user.address,_to,this.eventid,this.ticketid).subscribe((r)=>{
      this.message="";
      if(r){
        showMessage(this,"Transfert effectué");
        this._location.back();
      }
    },()=>{
      showMessage(this,"Ticket non transmis, problème technique");
      this._location.back();
    })
  }

  onflash(evt){
    $$("Lecture de l'adresse : "+evt.data);
    this.transfert(evt.data);
  }

  onenter(evt){
    if(evt.target.value==13){
      if(this.address!=null && this.address.length>10)
        this.transfert(evt.target.value);
    }
  }

}
