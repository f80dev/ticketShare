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

  constructor(public toast:MatSnackBar,
              public api:ApiService,
              public config:ConfigService,
              public router:Router) { }

  ngOnInit() {
    checkConfig(this);
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
