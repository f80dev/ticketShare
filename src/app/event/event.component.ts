import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {

  @Input("event") _event:any;
  @Input("height") height="200px";
  @Input("width") width="150px";
  @Input("maxwidth") maxWidth="500px";
  @Input("showAction") showAction=false;

  constructor() { }

  ngOnInit() {

  }

  openMap(){

  }

}
