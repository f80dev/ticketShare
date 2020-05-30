import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Location} from "@angular/common";
import {create_charts, subscribe_socket} from "../tools";
import {ConfigService} from "../config.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {
  _event: any;
  charts:any[]=[];
  message="";


  constructor(
    public socket:Socket,
    public api:ApiService,
    public _location:Location,
    public config:ConfigService,
    public toast:MatSnackBar,
    public route: ActivatedRoute,
    public router:Router
  ) {

  }


  refresh(){
    this.charts=[];
    this.message="Chargement des statistiques ...";
    this.api.stats(this._event._id).subscribe((r:any)=>{
      this._event=r;
      this.message="";
      this.charts=create_charts(r);
    });
  }



  ngOnInit() {
    if(!this.route.snapshot.queryParamMap.has("event"))this.router.navigate(["store"]);

    this._event={"_id":this.route.snapshot.queryParamMap.get("event")};
    this.refresh();
    subscribe_socket(this,"refresh_stats");
  }

}
