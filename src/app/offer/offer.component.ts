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

  constructor(
    public config:ConfigService,
    public api:ApiService,
    public _location:Location,
  ) { }

  ngOnInit() {
  }

}
