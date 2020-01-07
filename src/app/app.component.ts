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


  initUser() {
    const address = localStorage.getItem('address');
    if (!address) {
      this.dialog.open(PromptComponent, {width: '250px',
        data: {
          title: 'Email ou addresse de compte',
          question: 'Indiquer votre email ou l\'adresse de votre compte pour acheter des billets',
          result:"567E753E69EB31B532272697D687B6D607BBE86A0A699148F9A81541582724C8",
          onlyConfirm: false,
          canEmoji: false
        }
      }).afterClosed().subscribe((result) => {
        if(result==null){
          this._location.go("cgu.html");
        }
          
        this.api.adduser(result).subscribe((r: any) => {
          this.config.user = r;
          localStorage.setItem('address', r._id);
        },(err)=>{
          showMessage(this,"Adresse incorrecte");
          this.initUser();
        });
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
