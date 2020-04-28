import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.sass']
})
export class FaqsComponent implements OnInit {
  //Le parametre "open" permet d'ouvrir la FAQ

  faqs:any[]=[];

  constructor(public api:ApiService,
              public _location:Location,
              public route:ActivatedRoute) {
  }

  ngOnInit() {
    this.api.getfaqs().subscribe((rc:any[])=>{
      var params= this.route.snapshot.queryParamMap;

      this.faqs=[];

      rc.forEach((faq)=> {
        if (!params.has("open") || faq["index"].indexOf(params.get("open")) > -1) {
          faq.visible = params.has("open");
          this.faqs.push(faq)
        }
      });
    });
  }

}
