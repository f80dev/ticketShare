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
  filterEvent=null;
  tags: string[]=[];

  constructor(public api:ApiService,
              public config:ConfigService,
              public socket:Socket,
              public toast:MatSnackBar,
              public route:ActivatedRoute,
              public router:Router) {
  }


  refresh(){
    this.message="Recherche des événements disponibles";
    this.api.getevents(localStorage.getItem("address"),this.sortField,this.filterField).subscribe((l_events:any)=>{
      this.message="";
      this.events=[];
      this.tags=[];
      for(let e of l_events){

        if(this.filterEvent==null || this.filterEvent==e._id){
          for(let tag of e.tags.split(" ")){
            if(this.tags.indexOf(tag)==-1 && tag.length>0)this.tags.push(tag);
          }

          e["width"]="400px";
          e["htags"]="#"+e.tags.split(" ").join(" #");
          e.treatment="";
          e["expanded"]=true;
          if(e.state=="draft"){
            e["width"]="95%";
          }

          if(e.state=="ready")e.treatment="En attente de publication";
          if(e.state=="in treatment")e.treatment="En cours d'insertion dans la blockchain";

          e["preview"]=true;
          e["showDate"]=false;
          this.events.push(e);
        }
      }
    },(err)=>{
      this.message="";
      showMessage(this,"Problème technique, vérifier votre connexion",0,()=>{this.refresh()},"Réessayer ?");
    });
  }




  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    if(params.get("event"))
      this.filterEvent=params.get("event");

    if(params.get("filter"))
      this.filterField=params.get("filter");

    this.refresh();
    subscribe_socket(this,"refresh_store");
  }



  openWeb(url:string){
    open(url,"_blank");
  }


  /**
   *
   * @param _evt
   */
  buy(_evt: any) {
    if(this.config.user!=null && this.config.user.email==""){
      this.router.navigate(["login"],{queryParams:
          {
            message:"Pour acheter des places, vous devez indiquer un email pour recevoir les confirmations",
            redirect:"/places?event="+_evt._id+"&etherprice="+_evt.etherprice
          }
      });
    } else {
      this.router.navigate(["places"],{queryParams:{event:_evt._id,etherprice:_evt.etherprice}});
    }
  }


  preview(event:any){
    event.preview=true;
  }



  ongraph(event:any){
    openGraph(event.tx);
  }




  showData(event:any){
    if(event.showData==null)
      event.showData=true;
    else
      event.showData=!event.showData;
  }




  share(event:any){
    showMessage(this,"Lien promotionel copié");
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
    this.filterEvent=null;
  }



  /**
   *
   */
  fictif(){
    var index=tirage(6);
    var event=["demo","eiffel","bicep","foot","musee","pixies"][index];
    var addr=this.config.user.address;
    this.api._get("add_event/"+event+"?format=json&owner="+addr+"&miner="+addr).subscribe((r:any)=>{
      this.refresh();
    },(err)=>{
      this.message="";
      showMessage(this,err.message);
    });
  }


  reduceAll(){
    for(let e of this.events)
      e["expanded"]=false;
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


  receiveByMail(event:any,to:string){
    this.api.sendevent(event["_id"],to).subscribe(()=>{
      showMessage(this,"Le modèle de l'événement vous a été envoyé");
    },(err)=>{
      showMessage(this,err.message);
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
