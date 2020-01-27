import { Component, Input,OnInit } from '@angular/core';
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {


  @Input("event") _event:any;
  @Input("height") height="200px";
  @Input("width") width="150px";
  @Input("message") message="";
  @Input("maxwidth") maxWidth="500px";
  @Input("expanded") expanded=true;
  @Input("showAction") showAction=false;

  constructor(public config:ConfigService) { }

  ngOnInit() {

  }

  openMap(){

  }

}
