import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {ImageSelectorComponent} from "../image-selector/image-selector.component";
import {MatDialog} from "@angular/material";
import {api,showMessage} from "../tools";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  account=0;
  constructor(public config:ConfigService,
              public dialog: MatDialog,
              public router:Router,
              public api:ApiService) { }

  ngOnInit() {
    if(this.config.user)
      this.account=this.config.user.account;
  }

  saveUser() {
    this.api.setuser(this.config.user._id,{pseudo:this.config.user.pseudo,offer:this.config.user.offer}).subscribe((res: any) => {
      this.router.navigate(["home"]);
    });
  }

  cancelUser() {
    this.config.reload_user(()=>{
      this.router.navigate(["home"]);
    });
  }

  refreshSolde(data:any) {
    debugger
    if(data && data.hasOwnProperty("user"))
      this.account=data.user.money;
  }

  addImage(event) {
    event.stopPropagation();
    this.dialog.open(ImageSelectorComponent, {position:{left:'5vw',top:'5vh'},maxWidth:400,maxHeight:700,width: '90vw',height:'90vh', data:
        {
          result:this.config.user.photo,
          width: 200,
          height:200,
          emoji:false,
          internet:false,
          ratio:1
        }
    }).afterClosed().subscribe((result) => {
      if(result){
        this.config.user.photo=result;
        this.api.setuser(this.config.user._id,{photo:this.config.user.photo}).subscribe(()=>{
          showMessage(this,"Profil mis à jour");
        });
      }
    });
  }

  changeOffer() {
    this.router.navigate(["offer"]);
  }

  makeCard() {
    showMessage(this,"Vos billets sont disponibles sur cette carte qu'il vous suffit de montrer à l'entrée des événements pour lesquels vous avez acheté des billets");
    open(api("build_card/"+this.config.user.address),"_blank");
  }

  openWallet() {
    this.router.navigate(["wallet"]);
  }
}
