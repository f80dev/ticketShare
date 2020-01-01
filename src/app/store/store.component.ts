import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {

  events=[];

  constructor(public api:ApiService) { }

  ngOnInit() {
    this.api.getevents().subscribe((r:any)=>{
      this.events=r;
    })
  }

}
