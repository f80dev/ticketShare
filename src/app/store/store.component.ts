import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  $$,
  openGraph,
  showMessage,
  subscribe_socket,
  askForAuthent,
  create_charts,
  checkLogin,
  checkConfig
} from "../tools";
import {Socket} from "ngx-socket-io";
import {MatDialog, MatSnackBar} from "@angular/material";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {

  events=[];
  message="";
  sortField: string="dtCreate=desc";
  filterField: string="";
  onlyMyEvents=false;
  filterEvent=null;
  tags: string[]=[];
  _now=new Date().getTime();
  showLanding:boolean=false;

  constructor(public api:ApiService,
              public config:ConfigService,
              public dialog: MatDialog,
              public socket:Socket,
              public toast:MatSnackBar,
              public route:ActivatedRoute,
              public router:Router) {
  }


  updateFilterMyEvents(value:any){
    this.onlyMyEvents=value.checked;
    this.refresh();
  }

  openEventEditor() {
    askForAuthent(this,"La création d'un événement nécéssite une adresse mail pour l'envoi des confirmations",'eventeditor');
  }




  refresh(){
    checkConfig(this);
    this.message="Chargement des événements disponibles";
    $$("Récupération des événements");
    this.api.getevents(localStorage.getItem("address"),this.sortField,this.filterField).subscribe((l_events:any)=>{
      this.message="";
      this.events=[];
      this.tags=[];
      for(let e of l_events){
        if((e.state=='online' || e.owner==this.config.user.address) && (this.filterEvent==null || this.filterEvent==e._id) && (!this.onlyMyEvents || e["owner"]==this.config.user.address)){
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

          if(e.state=="ready")e.treatment="En cours de publication ...";
          if(e.state=="in treatment")e.treatment="En cours d'insertion dans la blockchain. Cela prendra quelques minutes ...";

          e["preview"]=true;
          e["showDate"]=false;

          if(e["owner"]==this.config.user.address || e["onstore"]*1000<new Date().getTime()){
            if(e.state.indexOf("cancel")==-1){
              this.events.push(e);
            }
          }
          e.charts=create_charts(e);
        }
      }
    },(err)=>{

      this.message="";
      showMessage(this,"Problème technique, vérifier votre connexion",0,()=>{this.refresh()},"Réessayer ?");
    });
  }




  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    if(params.has("event")){
      this.filterEvent=params.get("event");
      $$("On affiche après filtrage sur l'événement "+this.filterEvent);
      this.api.getevent(this.filterEvent).subscribe((r:any)=>{
        this.showLanding=(r.landing_page.length>0);
        if(this.showLanding)
          setTimeout(()=>{this.showLanding=false;},4000);
      });
    }

    if(params.has("command") && params.get("command")=='create'){this.openEventEditor();}

    if(params.has("onlyMyEvents")){
      $$("On affiche uniquement les événements du propriétaire");
      this.onlyMyEvents=params.get("onlyMyEvents")=='true';
    }

    if(params.get("filter"))
      this.filterField=params.get("filter");

    this.refresh();

    subscribe_socket(this,"refresh_store");
    subscribe_socket(this,"refresh_stats",(data:any)=>{
        this.api.stats(data.param._id).subscribe((r:any)=>{
          for(let i=0;i<this.events.length;i++){
            if(this.events[i]._id==r._id){
              this.events[i].stats=r.stats;
            }
          }

        });
      });
  }



  openWeb(url:string){
    open(url,"_blank");
  }


  // askForAuthent(message:string,redirect:string,func:Function){
  //   if(this.config.user!=null && this.config.user.email==""){
  //     this.router.navigate(["login"],{queryParams:
  //         {
  //           message:message,
  //           redirect:redirect
  //         }
  //     });
  //   } else {
  //     func();
  //   }
  // }


  /**
   *
   * @param _evt
   */
  buy(_evt: any) {
    var url_redirect="/places?event="+_evt._id+"&etherprice="+_evt.etherprice;
    if(_evt.hasOwnProperty("stores")){
      url_redirect=_evt.store.web.replace("{{domain}}",this.config.infos_server.domain).replace("{{idevent}}",_evt._id).replace("{{access_token}}",this.config.user.access_token);
    }
    askForAuthent(this,"Pour acheter des places, vous devez indiquer un email pour recevoir les confirmations",url_redirect);
  }



  extern_store(e) {
    let addr=localStorage.getItem("address");
    var timestamp=(new Date().getTime()/1000+100000);
    if(e.hasOwnProperty("stores")){
      var url=this.config.infos_server.domain+"/api/add_ticket/"+e._id+"/"+addr+"/2/"+timestamp;
      $$("Création fictive de billets avec "+url);
      open(url,"_blank");
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



  cancel(event:any){
      this.router.navigate(["cancel"],{queryParams:{idevent:event._id}})
  }


  /**
   * Analyse des ventes
   * @param event
   */
  sales_old(event:any){
    event.resume={};
    event.treatment="Chargement des résultats";
    this.api.available(event._id).subscribe((places:any[])=>{
      event.treatment="";
      for(let p of places){
        var price=p["price"];
        if(!event.resume.hasOwnProperty(p["price"]))event.resume[price]={"price":price,"free":0};
        event.resume[price]={"price":price,"free":event.resume[price]["free"]+1}
      }
      event.rows=Object.values(event.resume);
      event.preview=false;
    });
  }


  /**
   * Statistique de ventes
   * @param event
   */
  sales(event:any){
    if(this.config.device.isDesktop)
      event.preview=false;
    else
      this.router.navigate(["stats"],{queryParams:{event:event._id}});
  }



  validate(event:any){
    this.router.navigate(
      ["validate"],
      {queryParams:{event:event._id}}
      );
  }


  clearFilter(){
    this.sortField="dtCreate=desc";
    this.filterField="";
    this.filterEvent=null;
  }


  onpayment(){
    this.config.reload_user(()=>{this.refresh();});
  }


  reduceAll(){
    for(let e of this.events)
      e["expanded"]=false;
  }




  job(){
    $$("Lancement du traitement des événements");
    window.open(environment.domain_server+"/api/job/1","_blank");
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
    this.message="Suppression en cours ...";
    this.api.delevent(event._id,true,"").subscribe(()=>{
      this.message="";
      this.refresh();
      if(func!=null)func();
    },()=>{
      this.message="";
      showMessage(this,"Problème technique de suppression de l'événement");
    })
  }




  onCancel(event:any) {
    if(event.state=="in treatment"){
      $$("L'événement repasse au statut draft");
      this.api.setevent(event._id,{state:"draft"}).subscribe(()=>{
        showMessage(this,"Annulation de la demande de mise en ligne");
        this.refresh();
      });
    }

  }


  use_as_template(event) {
    this.router.navigate(["eventeditor"],{queryParams:{event:event._id}});
  }




  tr_delete(event) {
    this.api.delevent(event._id,true).subscribe(()=>{
      this.refresh();
    });
  }
}
