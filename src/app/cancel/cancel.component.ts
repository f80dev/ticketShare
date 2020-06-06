import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {ClipboardService} from "ngx-clipboard";
import {Location} from "@angular/common";
import {ApiService} from "../api.service";
import {checkLogin, showMessage, $$} from "../tools";

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.sass']
})
export class CancelComponent implements OnInit {

  _event:any={};
  message="";

  constructor(
    public config:ConfigService,
    public router:Router,
    public toast:MatSnackBar,
    public clipboard:ClipboardService,
    public route:ActivatedRoute,
    public _location:Location,
    public api:ApiService
  ) {}

  ngOnInit() {
    checkLogin(this);
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.message="Chargement de l'événement";
    $$("Récupération de l'utilisateur");
    this.config.reload_user(()=>{
      this.message="";
      this._event=this.config.user._events[params.get("idevent")];
      this._event.cancel={cause:"",hour:"",refund_address:""};
      if(!this._event.stats.hasOwnProperty("reserved"))this._event.stats["reserved"]=0;
      if(!this._event.stats.hasOwnProperty("sold"))this._event.stats["sold"]=0;
    })
  }



  cancel_event(auto){
    this.message="Annulation de l'événement";
    this.api.delevent(this._event._id,auto,this._event.cancel).subscribe(()=>{
      this.message="";
      this._location.back();
    });
  }



  to_draft(){
    this.api.setevent(this._event._id,{state:"draft"}).subscribe(()=>{
      showMessage(this,"Annulation de la demande de mise en ligne");
      this._location.back();
    });
  }


}
