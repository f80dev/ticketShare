import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.sass']
})
export class IntroComponent implements OnInit {

  constructor(
    public config:ConfigService
  ) { }

  ngOnInit() {
  }

  fromScratch() {

  }
}
