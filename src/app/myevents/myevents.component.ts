import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.sass']
})
export class MyeventsComponent implements OnInit {

  constructor(public router:Router,public config:ConfigService) { }

  ngOnInit() {

  }

  myplaces(event) {
    event["showTickets"]=true;
  }
}
