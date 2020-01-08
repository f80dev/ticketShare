import {Component, OnInit} from '@angular/core';
import {ConfigService} from './config.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PromptComponent} from './prompt/prompt.component';
import {ApiService} from './api.service';
import {Location} from "@angular/common";
import {Socket} from "ngx-socket-io";
import {subscribe_socket,$$,showMessage} from "./tools";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketShare';

  constructor(public config: ConfigService,
              public dialog: MatDialog,
              public api: ApiService,
              public toast:MatSnackBar,
              public socket:Socket,
              public _location: Location) {
    config.init();
    this.initUser();
  }

  create_user(result){
    this.api.adduser(result).subscribe((r: any) => {
      this.config.user = r;
      localStorage.setItem('address', r._id);
    },(err)=>{
      showMessage(this,"Adresse incorrecte");
      this.initUser();
    });
  }

  initUser() {
    const address = localStorage.getItem('address');
    if (!address) {
      this.dialog.open(PromptComponent, {width: '250px',
        data: {
          title: 'Rattachez un wallet',
          question: "Si vous n'avez pas de wallet ou que vous souhaitez un wallet dédié à vos billets, choississez créer, sinon renseigné votre clé privée pour utiliser votre wallet habituel",
          result:"567E753E69EB31B532272697D687B6D607BBE86A0A699148F9A81541582724C8",
          onlyConfirm: false,
          canEmoji: false,
          lbl_ok:"Existant",
          lbl_cancel:"Nouveau"
        }
      }).afterClosed().subscribe((result_key) => {
        if(result_key=="no"){
          this.dialog.open(PromptComponent, {width: '250px',
            data: {
              title: 'Indiquer votre mail',
              question: "Je dois vous envoyez certaines informations confidentielles sur votre nouveu wallet. Pouvez-vous m'indiquer votre mail",
              result:"hhoareau@gmail.com",
              onlyConfirm: false,
              canEmoji: false,
              lbl_ok:"Envoyer",
              lbl_cancel:""
            }
          }).afterClosed().subscribe((result_email) => {
            this.create_user(result_email);
          })
        } else {
          this.create_user(result_key);
        }
      });
    } else {
      this.api.getuser(address).subscribe((r: any) => {
        this.config.user = r;
      },(err)=>{
        localStorage.removeItem("address");
        this.initUser();
      });
    }
  }

  ngOnInit(): void {
    subscribe_socket(this,"refresh_sell");
  }
}
