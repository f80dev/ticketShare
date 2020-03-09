import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {checkConfig, subscribe_socket} from "../tools";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.sass']
})
export class MyeventsComponent implements OnInit {


  constructor(public router:Router,
              public route:ActivatedRoute,
              public socket:Socket,
              public config:ConfigService) {
  }

  refresh(){
    this.config.reload_user(()=>{
      if(this.config.user._events.length==1)
        this.myplaces(this.config.user._events[0]);
    });
  }

  ngOnInit() {
    checkConfig(this);
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
}
