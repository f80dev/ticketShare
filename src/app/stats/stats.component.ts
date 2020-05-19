import { Component, OnInit } from '@angular/core';
import {NgNavigatorShareService} from "ng-navigator-share";
import {ClipboardService} from "ngx-clipboard";
import {ApiService} from "../api.service";
import {Location} from "@angular/common";
import {create_charts} from "../tools";
import {ConfigService} from "../config.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {ChartType} from "angular-google-charts";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {
  _event: any;
  chart:any;

  constructor(
    public ngNavigatorShareService: NgNavigatorShareService,
    public _clipboardService:ClipboardService,
    public api:ApiService,
    public _location:Location,
    public config:ConfigService,
    public toast:MatSnackBar,
    public route: ActivatedRoute,
    public router:Router
  ) {

  }


  refresh(){
    var charts=create_charts(this._event);
    debugger
    this.chart=charts[0];
  }

  ngOnInit() {
    if(!this.route.snapshot.queryParamMap.has("event"))this.router.navigate(["store"]);
    if(this.config.user){
      this._event=this.config.user._events[this.route.snapshot.queryParamMap.get("event")];
      this.refresh();
    };
  }

}
