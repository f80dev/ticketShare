import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.sass']
})
export class ValidateComponent implements OnInit {
  public to_burn=[];
  showScanner=true;

  constructor(public api: ApiService,
              public config:ConfigService,
              public snackBar:MatSnackBar,
              public route: ActivatedRoute) { }


  ngOnInit() {

  }


  onflash_event($event: any) {
    this.showScanner=false;
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.api.use($event.data,params.get("event")).subscribe((r:any)=>{
      this.to_burn=r;
      if(this.to_burn.length==0){
        this.snackBar.open("Pas de ticket pour cet événement");
        this.showScanner=true;
      }
    })
  }
}
