import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import { Location } from '@angular/common';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.sass']
})
export class OfferComponent implements OnInit {

  offers:any[]=[];
  select_offer:any=null;

  constructor(
    public config:ConfigService,
    public api:ApiService,
    public _location:Location,
  ) { }

  ngOnInit() {
    this.api._get("offers").subscribe((r:any)=>{
      this.offers=r.result;
    })
  }

}
