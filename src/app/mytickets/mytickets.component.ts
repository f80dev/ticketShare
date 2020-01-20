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
  @Input("event") _event: any;
  tickets: any[];
  message="";

  constructor(public api:ApiService,
              public config:ConfigService,
              public router:Router,
              public _location:Location,
              public route:ActivatedRoute) {
  }

  refresh(){
    this.message="Récupération de vos billets";
    var idevent="";
    if(this._event!=null)idevent=this._event._id;

    this.api.use(this.config.user.address,idevent).subscribe((r:any)=>{
      this.message="";
      this.tickets=r;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this._event!=null)this.refresh();
  }

}
