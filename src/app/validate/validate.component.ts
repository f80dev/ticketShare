import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.sass']
})
export class ValidateComponent implements OnInit {
  public to_burn=[];

  constructor(public api: ApiService,public config:ConfigService,
              public route: ActivatedRoute) { }

  ngOnInit() {

  }


  onflash_event($event: any) {
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.api.use($event.data,params.get("event")).subscribe((r:any)=>{
      this.to_burn=r;
    })
  }
}
