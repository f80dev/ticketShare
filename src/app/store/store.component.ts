import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {$$, showMessage, subscribe_socket, tirage} from "../tools";
import {Socket} from "ngx-socket-io";
import {MatSnackBar} from "@angular/material";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {

  events=[];
  message="";

  constructor(public api:ApiService,
              public config:ConfigService,
              public socket:Socket,
              public toast:MatSnackBar,
              public route:ActivatedRoute,
              public router:Router) {
  }


  refresh(){
    this.api.getevents(localStorage.getItem("address")).subscribe((l_events:any)=>{
      this.events=[];
      for(let e of l_events){
        e["width"]="400px";
        if(e.state=="draft")e["width"]="100%";
        e["preview"]=true;
        this.events.push(e);
      }
    });
  }




  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    if(params.get("event"))
      this.router.navigate(
        ["places"],
        {queryParams:{event:params.get("event")}}
        );
    this.refresh();
    subscribe_socket(this,"refresh_store");
  }




  buy(event: any) {
    if(this.config.user!=null && this.config.user.email==""){
      this.router.navigate(["login"],{queryParams:
          {
            message:"Pour acheter des places, vous devez indiquer un email pour recevoir les confirmations",
            redirect:"/places?event="+event._id+"&etherprice="+event.etherprice
          }
      });
    } else {
      this.router.navigate(["places"],{queryParams:{event:event._id,etherprice:event.etherprice}});
    }
  }


  preview(event:any){
    event.preview=true;
  }


  sales(event:any){
    event.resume={};
    this.api.available(event._id).subscribe((places:any[])=>{
      for(let p of places){
        var price=p["price"];
        if(!event.resume.hasOwnProperty(p["price"]))event.resume[price]={"price":price,"free":0};
        event.resume[price]={"price":price,"free":event.resume[price]["free"]+1}
      }
      event.rows=Object.values(event.resume);
      event.preview=false;
    });
  }



  validate(event:any){
    localStorage.setItem("validation",event._id);
    this.router.navigate(
      ["validate"],
      {queryParams:{event:event._id}}
      );
  }




  /**
   *
   */
  fictif(){
    this.message="Fabrication d'un événement fictif. Cela peut être long ..."
    var index=tirage(4);
    var event=["demo","bicep","foot","musee","pixies"][index];
    this.api._get("add_event/"+event+"?format=json&owner="+this.config.user.address).subscribe((r:any)=>{
      this.message="";
      this.refresh();
    },(err)=>{
      this.message="";
      showMessage(this,err.message);
    });
  }




  job(){
    $$("Lancement du traitement des événements");
    window.open(environment.root_api+"/job/1","_blank");
  }




  publish(event:any){
    this.api.setevent(event["_id"],{"state":"ready"}).subscribe(()=>{
      showMessage(this,"Votre évémenement est prêt à être mise en ligne");
      this.refresh();
    })
  }



  delete(event:any){
    this.api.delevent(event["_id"]).subscribe(()=>{
      this.refresh();
    })
  }

}
