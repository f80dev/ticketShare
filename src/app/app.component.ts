import {Component, OnInit} from '@angular/core';
import {ConfigService} from "./config.service";
import {MatDialog} from "@angular/material";
import {PromptComponent} from "./prompt/prompt.component";
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketShare';

  constructor(public config:ConfigService, public dialog:MatDialog,public api:ApiService){
    config.init();
    this.initUser();
  }

  initUser(){
    var address=localStorage.getItem("address");
    if(!address){
      this.dialog.open(PromptComponent, {width: '250px',
        data: {
          title: "Email",
          question:"Indiquer votre email pour ouverture d'un wallet dédié aux billets",
          onlyConfirm: false,
          canEmoji:false
        }
      }).afterClosed().subscribe((result) => {
        this.api.adduser(result).subscribe((r:any)=>{
          this.config.user=r;
          localStorage.setItem("address",r._id);
        })
      });
    } else {
      this.api.getuser(address).subscribe((r:any)=>{
        this.config.user=r;
      });
    }
  }

  ngOnInit(): void {

  }
}
