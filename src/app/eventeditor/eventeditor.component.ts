import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {showMessage, tirage} from '../tools';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-eventeditor',
  templateUrl: './eventeditor.component.html',
  styleUrls: ['./eventeditor.component.sass']
})
export class EventeditorComponent implements OnInit {

  message="";
  showRefund=false;

  constructor(
    public config:ConfigService,
    public router:Router,
    public _location:Location,
    public api:ApiService
  ) { }

  ngOnInit() {
  }



  /**
   *
   */
  fictif(){
    var index=tirage(6);
    var event=["demo","eiffel","bicep","foot","musee","pixies"][index];
    var addr=this.config.user.address;
    this.api._get("add_event/"+event+"?format=json&owner="+addr+"&miner="+addr).subscribe((r:any)=>{
      this._location.back();
    },(err)=>{
      showMessage(this,err.message);
      this._location.back();
    });
  }


}
