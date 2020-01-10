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
  to_burn=[];
  showScanner=true;
  message="";

  lastAddress="";
  tickets=[];

  constructor(public api: ApiService,
              public config:ConfigService,
              public snackBar:MatSnackBar,
              public route: ActivatedRoute) {}



  ngOnInit() {

  }


  /**
   *
   * @param addr
   */
  refresh(addr:string){
    this.lastAddress=addr;
    var params:ParamMap=this.route.snapshot.queryParamMap;
    var evtid=params.get("event");
    this.message="Récupération des places du client";
    this.api.use(addr,evtid).subscribe((r:any)=>{
      this.message="";
      this.tickets=r;
      if(this.tickets.length==0){
        this.api.removeEvt(addr,evtid).subscribe(()=>{});
        this.snackBar.open("Pas de ticket pour cet événement");
        this.showScanner=true;
      }
    },()=>{
      this.message="";
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


  update_toburn(tickets:any){
    this.to_burn=tickets;
  }

  burn(all=false) {
    if(all)this.to_burn=this.tickets;
    this.message="Validation du ticket";
    var tickets="";
    for(let t of this.to_burn)
      tickets=tickets+t.value+","

    this.api.burn(tickets.substr(0,tickets.length-1)).subscribe((r:any)=>{
      if(r.status==200){
        this.message="";
        setTimeout(()=>{this.refresh(this.lastAddress);},500);
      }
    });
  }
}
