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
  address="";

  constructor(public config:ConfigService,
              public toast:MatSnackBar,
              public _location:Location,
              public route:ActivatedRoute,
              public api:ApiService) { }

  ngOnInit() {
    this.ticketid= this.route.snapshot.queryParamMap.get("ticket");
  }

  transfert(_to:string){
    this.api.transfert(this.config.user._id,_to,this.ticketid).subscribe((r)=>{
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
    if(evt.target.value!=null && evt.target.value.length>10)
      this.transfert(evt.target.value);
  }

}
