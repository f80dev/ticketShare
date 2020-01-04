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
  hourglass=false;

  lastAddress="";

  constructor(public api: ApiService,
              public config:ConfigService,
              public snackBar:MatSnackBar,
              public route: ActivatedRoute) { }


  ngOnInit() {

  }


  /**
   *
   * @param addr
   */
  refresh(addr:string){
    debugger
    this.lastAddress=addr;
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.hourglass=true;
    this.api.use(addr,params.get("event")).subscribe((r:any)=>{
      this.hourglass=false;
      this.to_burn=r;
      if(this.to_burn.length==0){
        this.snackBar.open("Pas de ticket pour cet événement");
        this.showScanner=true;
      }
    },()=>{
      this.hourglass=false;
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
    this.to_burn=[];
    this.api.burn(ticket._id).subscribe((r:any)=>{
      this.refresh(this.lastAddress);
    })
  }
}
