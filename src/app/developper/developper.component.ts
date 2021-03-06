import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {checkLogin, showMessage} from "../tools";
import {Location} from "@angular/common";
import {ClipboardService} from "ngx-clipboard";
import {PromptComponent} from "../prompt/prompt.component";

@Component({
  selector: 'app-developper',
  templateUrl: './developper.component.html',
  styleUrls: ['./developper.component.sass']
})
export class DevelopperComponent implements OnInit {

  tabs=[
      {
        label:"Créer un événement",
        api:"add_event/fnac",
        api_name:"add_event",
        intro:"Créer votre événement depuis votre site via l'API KERBERUS",
        sample:"",
        source:"",
        faq:"https://server.f80.fr:6800/api/faqs/api_build_event?format=html"
      },
      {
        label:"Sécuriser vos billets",
        api:"add_ticket/{{eventid}}/paul.dudule@gmail.com/TKT_cat1_05/10",
        api_name:"add_ticket",
        intro:"sécuriser chaque billet par envoi dans la blockchaine",
        sample:"https://app.kerberus.tech/assets/store.html?idevent={{eventid}}&faq",
        source:"https://github.com/f80dev/ticketShare/blob/master/src/assets/store.html",
        faq:"https://server.f80.fr:6800/api/faqs/api_add_ticket?format=html"
      },
      {
        label:"Valider les billets",
        api_name:"use",
        api:"use/paul.dudule@gmail.com/{{eventid}}",
        sample:"https://app.kerberus.tech/assets/use.html",
        source:"https://github.com/f80dev/ticketShare/blob/master/src/assets/use.html?idevent={{eventid}}&faq",
        intro:"Développer votre propre système de validation des billets ou intégrer les billets KERBERUS à un système de validation existant",
        faq:"https://server.f80.fr:6800/api/faqs/api_validate?format=html"
      }
    ];


  constructor(
    public config:ConfigService,
    public router:Router,
    public dialog: MatDialog,
    public toast:MatSnackBar,
    public clipboard:ClipboardService,
    public route:ActivatedRoute,
    public _location:Location,
    public api:ApiService
  ) {

  }

  ngOnInit() {
    var params:ParamMap=this.route.snapshot.queryParamMap;
    var idevent=params.get("event_target");
    if(!idevent)idevent="last";
    checkLogin(this);
    if(this.config.user){
      for(let i=0;i<this.tabs.length;i++){
        this.tabs[i].api=this.tabs[i].api.replace("{{userid}}",this.config.user._id).replace("{{eventid}}",idevent);
        this.tabs[i].sample=this.tabs[i].sample.replace("{{userid}}",this.config.user._id).replace("{{eventid}}",idevent);
      }
    }
  }


  informe_copy(mes){
    showMessage(this,mes+" dans le presse-papier",3000,()=>{
      this.router.navigate(["faq"],{queryParams:{faq:"api_key"}});
    },"En savoir plus");
  }


  open_api(api: string) {
    var url=this.config.infos_server.domain+"/api/"+api;
    if(api=="add_event")url=url+"/demo";
    url=url+"?access_token="+this.config.user.access_token;
    this.clipboard.copy(url);
    this.informe_copy("L'url de l'api");
    setTimeout(()=>{
      open(url,"api_sample");
    },1000);
  }

  open_frame(url: string) {
    open(url,"_blank");
  }

  renew_key() {
    this.dialog.open(PromptComponent, {width: '250px',
      data: {
        title: 'Renouveller la clé développeur',
        question: "Attention le renouvellement de votre clé développeur impliquer de mettre à jour le code de votre billeterie avec la nouvelle clé. Etes vous sûr de vouloir renouveller votre clé ?",
        result:"",
        onlyConfirm: true,
        canEmoji: false,
        lbl_ok:"Renouveller",
        lbl_cancel:"Annuler"
      }
    }).afterClosed().subscribe((result) => {
      if(result=="oui"){
        this.api.renew_dev_token(this.config.user._id).subscribe(()=>{

        });
      }
    });
  }
}
