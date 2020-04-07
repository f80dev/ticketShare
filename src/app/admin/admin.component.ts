import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Location} from "@angular/common";
import {ConfigService} from "../config.service";
import {checkLogin, showMessage} from "../tools";
import {MatSnackBar} from "@angular/material";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  infos: any={};
  jobs: any={};
  users: any={};
  admin:any={}

  constructor(public api:ApiService,
              public _location:Location,
              public router:Router,
              public toast:MatSnackBar,
              public config:ConfigService) {
  }

  refresh(){
    this.api.infos().subscribe((r:any)=>{
      if(r!=null){
        this.infos=r;
        this.admin={address:r.admin,ether:r.admin_ether};
      }
    });
    this.api.getusers().subscribe((r:any)=>{this.users=r;});
    this.api.job(0).subscribe((r:any)=>{this.jobs=r;});
  }

  ngOnInit(): void {
    this.refresh();
  }

  raz(){
    this.api.raz().subscribe(()=>{
      localStorage.removeItem("address");
      setTimeout(()=>{window.location.reload();},500);
      this.router.navigate(["home"]);
    });
  }


  log(){
    open("https://server.f80.fr:6800/api/infos/log","_blank");
  }

   /**
   * Vérification de l'email contenant les événements à créer
   */
  email_checking(){
    this.api._get("email_checking").subscribe(()=>{
      showMessage(this,"Vérification de l'email");
    })
  }





  job() {
    showMessage(this,"Job en cours d'exécution");
    this.api.job(1).subscribe((r:any)=>{
      showMessage(this,"");
      this.jobs=r;
      this.refresh();
    });
  }
}
