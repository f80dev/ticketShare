import { Component, Input,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {$$,showMessage} from '../tools';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass']
})
export class TicketComponent implements OnInit {

  @Input("ticket") ticket:any;

  constructor(
    public router:Router
  ) { }

  ngOnInit() {
  }

  openShare(ticket: any) {
    this.router.navigate(["share"],{queryParams:{ticket:ticket._id}});
  }
}
