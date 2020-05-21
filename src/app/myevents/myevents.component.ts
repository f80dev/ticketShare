import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {checkConfig, checkLogin, subscribe_socket} from "../tools";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.sass']
})
export class MyeventsComponent implements OnInit {

  events=[];
  message="";

  constructor(public router:Router,
              public route:ActivatedRoute,
              public socket:Socket,
              public config:ConfigService) {
  }





  refresh(){
    this.message="Chargement de vos événements";
    this.config.reload_user(()=>{
      this.message="";
      this.events=[];
      Object.values(this.config.user._events).forEach((_e:any)=>{
        if(_e.owner!=this.config.user.address){
          this.events.push(_e);
        }
      });
      if(this.events.length==1)
        this.myplaces(this.events[0]);
    });
  }


  /**
   *
   */
  ngOnInit() {
    checkConfig(this);
    checkLogin(this);
    this.refresh();
    var params:ParamMap=this.route.snapshot.queryParamMap;
    if(params.has("event")){
      setTimeout(()=>{
        if(this.config.user!=null && this.config.user._events!=null){
          for(var i=0;i<this.config.user._events.length;i++){
            if(this.config.user._events[i]["_id"]==params.get("event"))
              this.config.user._events[i]["showTickets"]=true;
          }
        }
      },5000);
    }
    subscribe_socket(this,"refresh_buy",()=>{
      this.refresh();
    });
  }





  myplaces(event) {
    event["showTickets"]=true;
  }




  buy_other(event) {
    if(event.hasOwnProperty('store')){
      this.router.navigate(["store"],{queryParams:{event:event._id}});
    }else{
      this.router.navigate(["places"],{queryParams:{event:event._id,etherprice:event.etherprice}});
    }

  }
}
