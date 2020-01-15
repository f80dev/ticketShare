import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  infos: any={};

  constructor(public api:ApiService,
              public config:ConfigService) {
  }

  ngOnInit(): void {
    this.api.infos().subscribe((r:any)=>{
      if(r!=null)this.infos=r;
    })
  }



}
