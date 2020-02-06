import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Location} from "@angular/common";
import {ConfigService} from "../config.service";
import {showMessage} from "../tools";
import {MatSnackBar} from "@angular/material";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  infos: any={};
  jobs: any={};

  constructor(public api:ApiService,
              public _location:Location,
              public toast:MatSnackBar,
              public config:ConfigService) {
  }

  refresh(){
    this.api.infos().subscribe((r:any)=>{
      if(r!=null)this.infos=r;
    })
    this.api.job(0).subscribe((r:any)=>{this.jobs=r;});
  }

  ngOnInit(): void {
    this.refresh();
  }

  raz(){
    this.api.raz().subscribe(()=>{
      this._location.go(environment.domain_appli);
    });
  }


  log(){
    open("https://server.f80.fr:6800/api/infos/log","_blank");
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
