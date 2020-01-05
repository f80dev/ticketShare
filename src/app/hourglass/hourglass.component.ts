import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hourglass',
  templateUrl: './hourglass.component.html',
  styleUrls: ['./hourglass.component.sass']
})
export class HourglassComponent implements OnInit {

  @Input("message") message="";

  constructor() { }

  ngOnInit() {
  }

}
