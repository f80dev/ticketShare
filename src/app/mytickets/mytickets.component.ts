import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.sass']
})
export class MyticketsComponent implements OnInit {
  _event: any;
  tickets: any[];
  message="";

  constructor(public api:ApiService,
              public config:ConfigService,
              public router:Router,
              public _location:Location,
              public route:ActivatedRoute) { }

  refresh(){
    this.message="Récupération de vos billets";
    this.api.use(this.config.user._id,this._event._id).subscribe((r:any)=>{
      this.message="";
      this.tickets=r;
    });
  }

  ngOnInit() {
    if(this.config.user==null)this.router.navigate(["home"]);

    var params:ParamMap=this.route.snapshot.queryParamMap;
    for(let evt of this.config.user._events){
      if(evt._id==params.get("event"))
        this._event=evt;
    }

    this.refresh();
  }

}
