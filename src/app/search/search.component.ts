import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {askForAuthent} from "../tools";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  query="";
  _events:any[]=[];
  message="";

  constructor(
    public config:ConfigService,
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit() {
  }



  onEnter(event=null){
    if(event==null || event.keyCode==13){
      this.message="Recherche en cours ...";
      this.api.search(this.query).subscribe((r:any)=>{
        if(r.length>0)
          this.message=r.length+" événements correspondent à votre recherche"
        else
          this.message="Aucun événement ne correspond à votre requête."

        this._events=r;
      });
    }
  }




  openEventEditor() {
    askForAuthent(this,"La création d'un événement nécéssite une adresse mail pour l'envoi des confirmations",'eventeditor');
  }
}
