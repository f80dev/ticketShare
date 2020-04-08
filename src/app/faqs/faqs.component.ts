import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.sass']
})
export class FaqsComponent implements OnInit {

  faqs:any[]=[];

  constructor(public api:ApiService,
              public route:ActivatedRoute) {
  }

  ngOnInit() {
    this.api.getfaqs().subscribe((faqs:any[])=>{
      var params = this.route.snapshot.queryParamMap;

      if(!params.has("open"))params["open"]="";

      for(let i=0;i<faqs.length;i++){
        if(faqs[i]["index"]==params["open"]){
          faqs[i]["visible"]=true;
        }else{
          faqs[i]["visible"]=false;
        }
      }

      this.faqs=faqs;
    });
  }

}
