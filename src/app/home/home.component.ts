import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common'
import {ConfigService} from "../config.service";
import {MatSnackBar} from "@angular/material";
import {ApiService} from "../api.service";
import {Meta} from "@angular/platform-browser";
import {Socket} from "ngx-socket-io";
import {$$} from "../tools";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  user:any={}

  constructor(public socket:Socket,
              public meta:Meta,
              public api: ApiService,
              public toast:MatSnackBar,
              public router: Router,
              public config:ConfigService,
              public _location:Location,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.analyse_params((p:any)=>{
      if(p.cmd=="store")
        this.router.navigate(["store"]);
    });

    this.socket.on("refresh",(data:any)=>{
      if(data.user==this.user._id){

      }
    });
  }


  analyse_params(func){
    var params=this.route.snapshot.queryParamMap;

    localStorage.setItem("firsturl",this._location.path());
    $$("Récupération des paramètres",params);

    if(this.config.params==null){
      this.config.params={
        cmd:params.get("cmd") || "",
        user:params.get("user") || "",
        event:params.get("event") || "",
      };

      $$("Netoyage de l'url de lancement:"+this._location.path());
      this._location.replaceState(this._location.path().split('?')[0],"");
      this._location.replaceState(this._location.path().split('/home')[0],"");
    }
    func(this.config.params);
  }

}
