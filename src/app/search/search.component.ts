import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  query="";
  _events:any[]=[];

  constructor(
    public config:ConfigService,
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  onEnter(event){
    if(event.keyCode==13){
      this.api.search(this.query).subscribe((r:any)=>{
        this._events=r;
      });
    }
  }

  askForAuthent(message:string,redirect:string,func:Function){
    if(this.config.user!=null && this.config.user.email==""){
      this.router.navigate(["login"],{queryParams:
          {
            message:message,
            redirect:redirect
          }
      });
    } else {
      func();
    }
  }


  openEventEditor() {
    this.askForAuthent("La création d'un événement nécéssite une adresse mail pour l'envoi des confirmations",'/eventeditor',()=>{
      this.router.navigate(['eventeditor']);
    });
  }
}
