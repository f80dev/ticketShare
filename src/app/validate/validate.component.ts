import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {$$, showMessage} from "../tools";

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
  _event:any;

  //http://localhost:4200/validate?event=1578905752

  constructor(public api: ApiService,
              public router:Router,
              public config:ConfigService,
              public toast:MatSnackBar,
              public route: ActivatedRoute) {

  }



  ngOnInit() {
    var idEvent=localStorage.getItem("validation");
    if(idEvent==null && this.config.params!=null && this.config.params["event"]!=null && this.config.params["event"].length>0)idEvent=this.config.params["event"];
    if(idEvent==null){
      $$("impossible de rester dans validate sans indiquer l'evenement a valider");
      this.router.navigate(["store"]);
    } else {
      this.api.getevent(idEvent).subscribe((r)=>{
        this._event=r;
        localStorage.setItem("validation",r["_id"]);
      })
    }
  }


  /**
   *
   * @param addr
   */
  refresh(addr:string){
    this.lastAddress=addr;
    if(addr.length>0){
      this.message="Récupération des places du client";
      this.api.use(addr,this._event["_id"]).subscribe((r:any)=>{
        this.message="";
        this.tickets=r;
        if(this.tickets.length==0){
          this.api.removeEvt(addr,this._event["_id"]).subscribe(()=>{});
          showMessage(this,"Pas de ticket pour cet événement");
          this.showScanner=true;
        }
      },()=>{
        this.message="";
      })
    }
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
    for(let t of this.to_burn){
      if(t.value!=null)
        tickets=tickets+t.value+","
      else{
        tickets=tickets+t._id+","
      }
    }

    this.api.burn(tickets.substr(0,tickets.length-1)).subscribe((r:any)=>{
      if(r.status==200){
        showMessage(this,"Validation des "+this.to_burn.length+" ticket(s) effectué");
        this.message="";
        this.showScanner=true;
        this.to_burn=[];
        this.tickets=[];
        this.refresh("");
      }
    });
  }
}
