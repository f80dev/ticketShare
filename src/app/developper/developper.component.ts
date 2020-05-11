import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {checkLogin, showMessage} from "../tools";
import {Location} from "@angular/common";

@Component({
  selector: 'app-developper',
  templateUrl: './developper.component.html',
  styleUrls: ['./developper.component.sass']
})
export class DevelopperComponent implements OnInit {

  tabs=[
      {
        label:"Créer un événement",
        api:"add_event/demo",
        intro:"Publiez un événement sur la base d'un modèle ou d'un fichier de configuration",
        sample:"https://app.kerberus.tech/assets/store.html",
        source:"https://github.com/f80dev/ticketShare/blob/master/src/assets/use.html",
        faq:"https://server.f80.fr:6800/api/faqs/api_build_event?format=html"
      },
      {
        label:"Sécuriser vos billets",
        api:"add_ticket/{{eventid}}/paul.dudule@gmail.com/TKT_cat1_05/10",
        intro:"Ajouter le ticket transmit à l'API à la blockchain",
        sample:"https://app.kerberus.tech/assets/store.html",
        source:"https://github.com/f80dev/ticketShare/blob/master/src/assets/use.html",
        faq:"https://server.f80.fr:6800/api/faqs/api_add_ticket?format=html"
      },
      {
        label:"Valider les billets",
        api:"use/paul.dudule@gmail.com/{{eventid}}",
        sample:"https://app.kerberus.tech/assets/use.html",
        source:"https://github.com/f80dev/ticketShare/blob/master/src/assets/use.html",
        intro:"Développer votre propre système de validation des billets ou intégrer les billets KERBERUS à un système de validation existant",
        faq:"https://server.f80.fr:6800/api/faqs/api_validate?format=html"
      }
    ];




  constructor(
    public config:ConfigService,
    public router:Router,
    public route:ActivatedRoute,
    public _location:Location,
    public api:ApiService
  ) {

  }

  ngOnInit() {
    var params:ParamMap=this.route.snapshot.queryParamMap;
    var idevent=params.get("event_target");
    if(!idevent)idevent="last";
    checkLogin(this.router);
    if(this.config.user){
      for(let i=0;i<this.tabs.length;i++){
        this.tabs[i].api=this.tabs[i].api.replace("{{userid}}",this.config.user._id).replace("{{eventid}}",idevent);
      }
    }
  }


  informe_copy(){
    showMessage(this,"Votre clé d'API est disponible dans le presse-papier",3000,()=>{
      this.router.navigate(["faq"],{queryParams:{faq:"api_key"}});
    },"En savoir plus");
  }


  open_api(api: string) {
    var url=this.config.infos_server.domain+"/api/"+api;
    if(api=="add_event")url=url+"/demo";
    url=url+"?access_token="+this.config.user.access_token;
    open(url,"api_sample");
  }
}
