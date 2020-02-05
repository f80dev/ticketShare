import {Component, OnChanges, Input, SimpleChanges} from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.sass']
})
export class MyticketsComponent implements  OnChanges {
  @Input("tickets") tickets: any[];

  constructor(public api:ApiService,
              public config:ConfigService,
              public router:Router,
              public _location:Location,
              public route:ActivatedRoute) {
  }

  refresh(){
    // var idevent="";

    // this.api.use(this.config.user.address,idevent).subscribe((r:any)=>{
    //   this.message="";
    //   this.tickets=r;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if(this._event!=null)this.refresh();
  }

}
