import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../config.service";
import {checkConfig, checkLogin, showMessage} from "../tools";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {PromptComponent} from "../prompt/prompt.component";

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
              public dialog: MatDialog,
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


  change_wallet() {
    /**
     * Rattache un wallet existant
     * @param func callback
     */
      this.dialog.open(PromptComponent, {width: '250px',
        data: {
          title: 'Rattachez un wallet',
          question: "Si vous n'avez pas de wallet ou que vous souhaitez un wallet dédié à vos billets, choississez créer, sinon renseigné votre clé privée pour utiliser votre wallet habituel",
          result:"567E753E69EB31B532272697D687B6D607BBE86A0A699148F9A81541582724C8",
          onlyConfirm: false,
          canEmoji: false,
          lbl_ok:"Ok",
          lbl_cancel:"Annuler"
        }
      }).afterClosed().subscribe((result_key) => {
        if(result_key!=null && result_key.length>0){
          this.api.adduser(result_key).subscribe((u:any)=>{
            localStorage.setItem("address",u._id);
            window.location.reload();
          })
        }
      });


  }
}
