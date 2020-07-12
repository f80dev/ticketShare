import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ConfigService} from "../config.service";
import { Location } from '@angular/common';
import {range, checkLogin, subscribe_socket} from "../tools";
import {MatSnackBar} from "@angular/material";
import {Socket} from "ngx-socket-io";
import {$$,showMessage} from '../tools';
import {stringify} from "querystring";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {

  tickets:any[]=[];
  message="";
  total=0;
  eventname="";
  eventitem="place";
  categories={};
  l_categories:string[]=[];
  cats:any[]=[];

  days=[];
  hours=[];
  _dates:Date[]=[];

  nb_places=0;
  sel_tickets: any;
  etherprice=0;
  breakpoint: number;
  selectDate="";
  selectTime="";
  selectCategorie="*";


  constructor(public api: ApiService,
              public toast:MatSnackBar,
              public socket:Socket,
              public router:Router,
              public config:ConfigService,
              private _location: Location,
              public route: ActivatedRoute) {

  }


  /**
   * Chargement des tickets
   */
  load_tickets(func,func_error){
    this.message="Récupération des "+this.eventitem+" diponibles";
    const addr=localStorage.getItem("address");
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.api.available(params.get("event"),addr).subscribe((r:any)=>{
      this.message="";
      this.tickets=[];
      this._dates=[];
      this.days=[];
      for(let _t of r){
        if(_t.state=="available"){
          var d:Date=new Date(_t.date*1000);
          if(this._dates.indexOf(d)==-1){
            this._dates.push(d);
            if(this.days.indexOf(d.toLocaleDateString())==-1)this.days.push(d.toLocaleDateString());
          }
          this.tickets.push(_t);
        }
      }
      this.selectDate=this.days[0];
      this.init_hours();
      func();
    },(err)=>{func_error(err)});
  }


  /**
   * Initialise la liste des heures des événements
   */
  init_hours(){
    $$("Chargement des heures disponibles pour "+this.selectDate);
    this.hours=[];
    for(let dt of this._dates){
      let s=dt.toTimeString().substr(0,dt.toTimeString().lastIndexOf(":"));
      if(dt.toLocaleDateString()==this.selectDate && this.hours.indexOf(s)==-1){
        this.hours.push(s);
      }
    }
    if(this.hours.length>0)this.selectTime=this.hours[0];
    this.refresh();
  }




  clearFilter(){
    this.selectCategorie="*";
  }

  refresh(){
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.etherprice=Number(params.get("etherprice"));
      this.message="";
      if(this.tickets.length==0){
        this._location.back();
        showMessage(this,"Plus de "+this.eventitem+" disponible");
      } else {
        this.categories={};
        $$("On parcours l'ensemble des tickets pour identifier les catégories");
        var s=this.selectDate.split("/")[1]+"-"+this.selectDate.split("/")[0]+"-"+this.selectDate.split("/")[2]+" ";
        var currentDate=new Date(s+this.selectTime).getTime()/1000;
        if(!currentDate)currentDate=new Date(this.selectDate+" "+this.selectTime).getTime()/1000;
        for(let _t of this.tickets){
          if(_t.date==currentDate){
            if(this.categories[_t.price]==null)this.categories[_t.price]={"to_buy":0,"buy":0,"tickets":[]};
            this.categories[_t.price].description=_t.description;
            this.categories[_t.price].visual=_t.visual;
            this.categories[_t.price].value=_t.price;
            if(!this.categories[_t.price].hasOwnProperty("limit") || this.categories[_t.price].to_buy<this.categories[_t.price].limit)this.categories[_t.price].to_buy++;
            if(_t.price==0)
              this.categories[_t.price].title="Gratuit";
            else
              this.categories[_t.price].title=_t.price+"€";
            this.categories[_t.price].range=range(0,this.categories[_t.price].to_buy);
            this.categories[_t.price].tickets.push(_t);
          }
        }
        this.l_categories=Object.keys(this.categories);
        this.cats=Object.values(this.categories);
      }
  }

  onResize(event) {
    if(event.target!=null)
      this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 2;
  }


  refresh_balance(){
    this.config.reload_user();
  }


  ngOnInit() {
    this.onResize({event:{target:window}});
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.eventitem=params.get("eventitem");
    checkLogin(this);
    this.config.reload_user();
    this.load_tickets(()=>{
      this.selectDate=this._dates[0].toLocaleDateString();
      this.refresh();
    },(err)=>{showMessage(this, err.message);this._location.back();});
    if(localStorage.getItem("dtBuy")!=null){
      var delay=new Date().getTime()-Number(localStorage.getItem("dtBuy"));
      this.message="Recherche des places disponibles";
    }
  }


  refund(){
    showMessage(this,"L'adresse du wallet spectacle, nécéssaire au rechargement du compte, est dans le presse papier",0,()=>{
      open(this.config.user.refunding,"blank");
    },"Recharger");
  }

  /**
   *
   */
  buy(){
    var tickets=[];
    if(this.sel_tickets!=null){
      for(let ticket of this.sel_tickets) {
        debugger
        if(ticket.need_photo && this.config.user.photo.length==0){
          showMessage(this,"Impossible, certaines places nécéssitent d'avoir attaché à une photo à votre compte");
          return;
        }
        tickets.push(ticket.value)
      }
    }

    for(let cat of Object.keys(this.categories)) {
      var item=this.categories[cat];
      while(item.buy>0){
        tickets.push(item.tickets[item.buy-1]._id)
        item.buy--;
      }
    }

    var params:ParamMap=this.route.snapshot.queryParamMap;
    const idEvent=params.get("event");
    const address=localStorage.getItem("address");

    this.message="Réservation en cours";

    const order={nb_places:this.nb_places,tickets:tickets,client:address,event:idEvent,etherprice:this.etherprice,total:this.total};
    this.router.navigate(["payment"],{queryParams:{order:JSON.stringify(order)}});
  }

  reset_status(){

  }


  update_total(tickets:any=null) {
    this.total=0;this.nb_places=0;
    for(let cat of Object.keys(this.categories)){
      const price=Number(cat);
      this.nb_places=this.nb_places+this.categories[cat].buy;
      this.total=this.total+price*this.categories[cat].buy;
    }
  }
}
