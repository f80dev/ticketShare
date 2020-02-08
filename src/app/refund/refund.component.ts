import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {Router} from "@angular/router";
import {checkLogin} from "../tools";

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.sass']
})
export class RefundComponent implements OnInit {

  constructor(public config:ConfigService,public router:Router) { }

  ngOnInit() {
    checkLogin(this.router);
  }

}
