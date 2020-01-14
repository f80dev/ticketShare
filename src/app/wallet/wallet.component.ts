import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {checkConfig, showMessage} from "../tools";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.sass']
})
export class WalletComponent implements OnInit {
  private_key1: string="";
  private_key2: string="";
  public_key:string="";

  constructor(public toast:MatSnackBar,
              public api:ApiService,
              public config:ConfigService,
              public router:Router) { }

  ngOnInit() {
    checkConfig(this);
    if(this.config.user!=null)
      this.public_key=this.config.user._id;

    if(this.config.user!=null && this.config.user.private_key!=null && this.config.user.private_key.length>20){
      this.private_key1=this.config.user.private_key.substr(0,this.config.user.private_key.length/2);
      this.private_key2=this.config.user.private_key.substr(this.config.user.private_key.length/2+1);
    }

  }

  send_codes() {
    this.api.resend(this.config.user._id).subscribe(()=>{
      showMessage(this,"Consulter votre messagerie");
    })
  }

  informe_copy() {
    showMessage(this,"Adresse copiée");
  }


}
