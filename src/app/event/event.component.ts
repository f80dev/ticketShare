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
  @Input("title") title="";
  @Input("message") message="";
  @Input("maxwidth") maxWidth="500px";
  @Input("expanded") expanded=true;
  @Input("showAction") showAction=false;

  constructor(public config:ConfigService) { }

  ngOnInit() {
    if(this.title.length==0)this.title=this._event.name;
    this._event.delay=1e9;
    for(let t of this._event.tickets){
      t.delayInSec=t.date-new Date().getTime();
      if(this._event.delay>t.delayInSec)this._event.delay=t.delayInSec;
    }
  }

  openMap(){

  }

}
