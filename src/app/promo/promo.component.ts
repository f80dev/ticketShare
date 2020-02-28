import { Component, OnInit } from '@angular/core';
import {showMessage,sendToPrint} from "../tools";
import {NgNavigatorShareService} from "ng-navigator-share";
import {ClipboardService} from "ngx-clipboard";
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.sass']
})
export class PromoComponent implements OnInit {

  _event:any={};

  constructor(
    public ngNavigatorShareService: NgNavigatorShareService,
    public _clipboardService:ClipboardService,
    public api:ApiService,
    public toast:MatSnackBar,
    public route: ActivatedRoute,
    public router:Router
  ) {

  }

  ngOnInit() {
    if(!this.route.snapshot.queryParamMap.has("event"))this.router.navigate(["store"]);
    this.api.getevent(this.route.snapshot.queryParamMap.get("event")).subscribe((e:any)=>{
      e.qrcode=environment.root_api+"/qrcode?url="+encodeURIComponent(e.share_link);
      this._event=e;
    })
  }

  informe_copy() {
    showMessage(this,"Adresse copiée");
  }


  share(event:any){
    this.ngNavigatorShareService.share({title: event.name,text: "Outil de validation des billets",url: event.share_link})
      .then( (response) => {console.log(response);})
      .catch( (error) => {
        this._clipboardService.copyFromContent(event.share_link)
        showMessage(this,"Lien promotionel disponible dans le presse-papier");
      });
  }

  openPrinter(_event:any){
    sendToPrint("print-section");
  }


}
