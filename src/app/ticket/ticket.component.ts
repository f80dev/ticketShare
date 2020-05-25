import { Component, Input,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {isNull, $$,showMessage} from '../tools';
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass']
})
export class TicketComponent implements OnInit {

  @Input("ticket") ticket:any;
  @Input("title") title=null;
  @Input("subtitle") subtitle=null;
  @Input("width") width="150px";
  @Input("height") height="270px";
  @Input("align") align="center";
  @Input("transferable") transferable=true;
  @Input("showAction") showAction=true;

  constructor(
    public router:Router,
    public config:ConfigService
  ) { }

  ngOnInit() {
    if(isNull(this.title))this.title=this.ticket.title;
    if(isNull(this.subtitle))this.subtitle=new Date(this.ticket.date).toLocaleDateString();
  }

  openShare(ticket: any) {
    this.router.navigate(["share"],{queryParams:{ticket:ticket._id,event:ticket.event}});
  }
}
