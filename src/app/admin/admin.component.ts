import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {showMessage} from "../tools";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  infos: any={};
  jobs: any={};

  constructor(public api:ApiService,
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


  job() {
    showMessage(this,"Job en cours d'exécution");
    this.api.job(1).subscribe((r:any)=>{
      showMessage(this,"");
      this.jobs=r;
      this.refresh();
    });
  }
}
