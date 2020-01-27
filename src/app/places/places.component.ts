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
  categories={};
  l_categories:string[]=[];
  cats:any[]=[];
  _dates:number[]=[];
  nb_places=0;
  sel_tickets: any;
  etherprice=0;
  breakpoint: number;
  selectDate=0;
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
    this.message="Récupération des places diponibles";
    const addr=localStorage.getItem("address");
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.api.available(params.get("event"),addr).subscribe((r:any)=>{
      this.message="";
      this.tickets=[];
      this._dates=[];
      for(let _t of r){
        if(_t.state=="available"){
          if(this._dates.indexOf(_t.date)==-1)this._dates.push(_t.date);
          this.tickets.push(_t);
        }
      }
      func();
    },(err)=>{func_error(err)});
  }



  refresh(){
    var params:ParamMap=this.route.snapshot.queryParamMap;
    this.etherprice=Number(params.get("etherprice"));
      this.message="";
      if(this.tickets.length==0){
        this._location.back();
        showMessage(this,"Plus de place disponible");
      } else {
        this.categories={};
        $$("On parcours l'ensemble des tickets pour identifier les catégories");
        for(let _t of this.tickets){
          if(_t.date==this.selectDate){
            if(this.categories[_t.price]==null)this.categories[_t.price]={"to_buy":0,"buy":0,"tickets":[]};
            this.categories[_t.price].description=_t.description;
            this.categories[_t.price].visual=_t.visual;
            this.categories[_t.price].value=_t.price;
            this.categories[_t.price].to_buy++;
            this.categories[_t.price].range=range(1,this.categories[_t.price].to_buy)
            this.categories[_t.price].tickets.push(_t);
          }
        }
        this.l_categories=Object.keys(this.categories);
        this.cats=Object.values(this.categories);
      }
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 2;
  }



  ngOnInit() {
    this.onResize({event:{target:window}});
    checkLogin(this.router);
    this.load_tickets(()=>{
      this.selectDate=this._dates[0];
      this.refresh();
    },(err)=>{showMessage(this, err.message);this._location.back();});
    if(localStorage.getItem("dtBuy")!=null){
      var delay=new Date().getTime()-Number(localStorage.getItem("dtBuy"));
      this.message="Recherche des places disponibles";
    }
  }




  buy(){
    var rc=[];
    if(this.sel_tickets!=null){
      for(let ticket of this.sel_tickets) {
        rc.push(ticket.value)
      }
    }

    for(let cat of Object.keys(this.categories)) {
      var item=this.categories[cat];
      while(item.buy>0){
        rc.push(item.tickets[item.buy-1]._id)
        item.buy--;
      }
    }

    var params:ParamMap=this.route.snapshot.queryParamMap;
    const idEvent=params.get("event");
    const address=localStorage.getItem("address");

    this.api.buy(address,rc,idEvent).subscribe((r:any)=>{
      if(r!=null){
        localStorage.setItem("dtBuy",stringify(new Date().getTime()));
        showMessage(this,"Enregistrement de la tansaction dans la blockchain");
        this.router.navigate(["store"]);
      }
    }
    ,(err)=>{
      showMessage(this,"Enregistrement de la tansaction dans la blockchain");
      this.router.navigate(["store"]);
    }
    )
  }



  update_total(tickets:any=null) {
    this.total=0;this.nb_places=0;
    if(tickets!=null){
      this.sel_tickets=tickets;
      this.nb_places=tickets.length;
      for(let t of tickets){
        for(let r of this.tickets){
          if(t.value==r._id)this.total=this.total+r.price;
        }
      }
    }
    for(let cat of Object.keys(this.categories)){
      this.nb_places=this.nb_places+this.categories[cat].buy;
      this.total=this.total+Number(cat)*this.categories[cat].buy;
    }
  }
}
