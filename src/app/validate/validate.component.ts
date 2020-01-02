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

  lastAddress="";

  constructor(public api: ApiService,
              public config:ConfigService,
              public snackBar:MatSnackBar,
              public route: ActivatedRoute) { }


  ngOnInit() {

  }


  refresh(addr:string){
    this.lastAddress=addr;
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.api.use(addr,params.get("event")).subscribe((r:any)=>{
      this.to_burn=r;
      if(this.to_burn.length==0){
        this.snackBar.open("Pas de ticket pour cet événement");
        this.showScanner=true;
      }
    })
  }

  onflash_event($event: any) {
    this.showScanner=false;
    this.refresh($event.data);
  }

  update_addr($event) {
    const addr=$event.currentTarget.value;
    if(addr!=null && addr.length==42 && addr.startsWith("0x")){
      this.onflash_event({data:addr});
    }
  }

  burn(ticket: any) {
    this.api.burn(ticket._id).subscribe((r)=>{
      this.refresh(this.lastAddress);
    })
  }
}
