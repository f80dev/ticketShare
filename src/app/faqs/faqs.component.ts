import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.sass']
})
export class FaqsComponent implements OnInit {

  faqs:any[]=[];

  constructor(public api:ApiService) {

  }

  ngOnInit() {
    this.api.getfaqs().subscribe((f:any)=>{
      this.faqs=f;
    });
  }

}
