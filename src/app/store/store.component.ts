import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {$$, openGraph, showMessage, subscribe_socket, tirage} from "../tools";
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
  sortField: string="";
  filterField: string="";
  tags: string[]=[];

  constructor(public api:ApiService,
              public config:ConfigService,
              public socket:Socket,
              public toast:MatSnackBar,
              public route:ActivatedRoute,
              public router:Router) {
  }


  refresh(){
    this.api.getevents(localStorage.getItem("address"),this.sortField,this.filterField).subscribe((l_events:any)=>{
      this.events=[];
      this.tags=[];
      for(let e of l_events){
        for(let tag of e.tags.split(" ")){
          if(this.tags.indexOf(tag)==-1 && tag.length>0)this.tags.push(tag);
        }

        e["width"]="400px";
        e.treatment="";
        if(e.state=="draft"){
          e["width"]="100%";
        }

        if(e.state=="ready")e.treatment="En attente de publication";
        if(e.state=="in treatment")e.treatment="En cours d'insertion dans la blockchain";



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



  ongraph(event:any){
    openGraph(event.tx);
  }


  cancel(event:any){
    this.api.delevent(event._id).subscribe(()=>{
      this.refresh();
    });
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


  clearFilter(){
    this.sortField="";
    this.filterField="";
  }



  /**
   *
   */
  fictif(){
    var index=tirage(4);
    var event=["demo","bicep","foot","musee","pixies"][index];
    this.api._get("add_event/"+event+"?state=ready&format=json&owner="+this.config.user.address).subscribe((r:any)=>{
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



  delete(event:any,func=null){
    this.api.delevent(event["_id"]).subscribe(()=>{
      this.refresh();
      if(func!=null)func();
    })
  }

  onCancel(event:any) {
    this.delete(event,()=>{
      this.refresh();
    });
  }
}
