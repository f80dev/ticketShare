import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  evts=[];

  constructor(public api:ApiService) { }

  ngOnInit() {
    this.api.getevents("1").subscribe((r:any)=>{

      this.evts=r;
    });
  }

}
