import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigService} from "../config.service";
import {Router} from "@angular/router";
import {checkConfig, subscribe_socket} from "../tools";

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.sass']
})
export class MyeventsComponent implements OnInit {


  constructor(public router:Router,public config:ConfigService) { }


  ngOnInit() {
    checkConfig(this);
    subscribe_socket(this,"refresh_burn",false);
  }

  myplaces(event) {
    event["showTickets"]=true;
  }
}
