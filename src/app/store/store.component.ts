import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {$$, openGraph, showMessage, subscribe_socket, tirage} from "../tools";
import {Socket} from "ngx-socket-io";
import {MatDialog, MatSnackBar} from "@angular/material";
import {environment} from '../../environments/environment';
import {NgNavigatorShareService} from "ng-navigator-share";
import {ClipboardService} from "ngx-clipboard";
import {PromptComponent} from "../prompt/prompt.component";

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
              public dialog: MatDialog,
              private _clipboardService: ClipboardService,
              public socket:Socket,
              public ngNavigatorShareService: NgNavigatorShareService,
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


  askForAuthent(message:string,redirect:string,func:Function){
    if(this.config.user!=null && this.config.user.email==""){
      this.router.navigate(["login"],{queryParams:
          {
            message:message,
            redirect:redirect
          }
      });
    } else {
      func();
    }
  }


/**
   *
   * @param _evt
   */
  buy(_evt: any) {
    this.askForAuthent("Pour acheter des places, vous devez indiquer un email pour recevoir les confirmations","/places?event="+_evt._id+"&etherprice="+_evt.etherprice,()=>{
      this.router.navigate(["places"],{queryParams:{event:_evt._id,etherprice:_evt.etherprice}});
    })
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
    this.ngNavigatorShareService.share({title: event.name,text: "Outil de validation des billets",url: event.share_link})
      .then( (response) => {console.log(response);})
      .catch( (error) => {
        this._clipboardService.copyFromContent(event.share_link)
        showMessage(this,"Lien promotionel disponible dans le presse-papier");
      });
  }


  cancel(event:any){
    this.dialog.open(PromptComponent,{width: '250px',data: {title: "Annulation de l'événement", question: "Etês vous sûr de vouloir annuler cet évenement et ainsi déclencher le remboursement de tous les billets",confirmOnly:true}
    }).afterClosed().subscribe((result) => {
      if(result=="yes"){
        this.api.delevent(event._id).subscribe(()=>{
          this.refresh();
        });
      }
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


  onpayment(){
    this.config.reload_user(()=>{
      this.refresh();
      }
    );
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
    this.message="Suppression en cours ...";
    this.api.delevent(event["_id"]).subscribe(()=>{
      this.message="";
      this.refresh();
      if(func!=null)func();
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


  openEventEditor() {
    this.askForAuthent("La création d'un événement nécéssite une adresse mail pour l'envoi des confirmations",'/eventeditor',()=>{
      this.router.navigate(['eventeditor']);
    });
  }
}
