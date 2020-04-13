import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.css']
})
export class CguComponent implements OnInit {

  constructor(
    public _location: Location,
    public config:ConfigService
  ) { }

  ngOnInit() {
  }

  accept(){
    this._location.back();
  }

}
