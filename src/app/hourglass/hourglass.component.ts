import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hourglass',
  templateUrl: './hourglass.component.html',
  styleUrls: ['./hourglass.component.sass']
})
export class HourglassComponent implements OnInit {

  @Input("message") message="";
  @Input("canCancel") canCancel=false;
  @Output('cancel') oncancel: EventEmitter<any>=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
