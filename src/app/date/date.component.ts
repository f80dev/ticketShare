import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.sass']
})
export class DateComponent implements OnInit {

  @Input("date") _date=0;
  delay=0;
  prefix="";

  constructor() { }

  ngOnInit() {
    this._date=this._date*1000;
    this.delay=(this._date-new Date().getTime())/(3600*1000);
    if(this.delay<0){
      this.prefix="depuis ";
      this.delay=-this.delay;
    }
  }

}
