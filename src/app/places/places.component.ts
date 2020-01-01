import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {

  tickets:any[]=[];

  constructor(public api: ApiService,public config:ConfigService,
              public route: ActivatedRoute) { }


  ngOnInit() {
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.api.available(params.get("event"),localStorage.getItem("address")).subscribe((r:any)=>{
      this.tickets=r;
    });
  }

}
