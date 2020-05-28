import { Component, OnInit } from '@angular/core';
import {NgNavigatorShareService} from "ng-navigator-share";
import {ClipboardService} from "ngx-clipboard";
import {Socket} from "ngx-socket-io";
import {ApiService} from "../api.service";
import {Location} from "@angular/common";
import {ConfigService} from "../config.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {showError, showMessage} from "../tools";

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.sass']
})
export class ImporterComponent implements OnInit {

  tickets:any[]=[];
  message="";

  constructor(
    public ngNavigatorShareService: NgNavigatorShareService,
    public _clipboardService:ClipboardService,
    public socket:Socket,
    public api:ApiService,
    public _location:Location,
    public config:ConfigService,
    public toast:MatSnackBar,
    public route: ActivatedRoute,
    public router:Router,
  ) {

  }

  ngOnInit() {
    if(!this.route.snapshot.queryParamMap.has("event"))this.router.navigate(["store"]);
  }

  import(fileInputEvent: any) {
    this.message="Importation en cours ...";

      let idevent=this.route.snapshot.queryParamMap.get("event");
      var reader = new FileReader();
      reader.onload = ()=>{
        this.api.add_ticket(idevent,reader.result,this.config.user.access_token,true).subscribe((r:any)=>{
          this.message="";
          this.tickets=r;
        },(err)=>{
          this.message="";
          showError(this,err);
        })
      };
      reader.readAsDataURL(fileInputEvent.target.files[0]);


  }

  build_tickets() {
    this.message="Importation de "+this.tickets.length+" billets";
    this.api.add_ticket(this.route.snapshot.queryParamMap.get("event"),this.tickets,this.config.user.access_token,false).subscribe((r:any)=>{
      this.message="";
      showMessage(this,"Importation réussi, sécurisation des billets en cours");
      this._location.back();
    },(err)=>{
      showError(this,err);
    });
  }
}
