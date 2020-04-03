import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {showMessage, $$} from '../tools';
import {ApiService} from '../api.service';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-eventeditor',
  templateUrl: './eventeditor.component.html',
  styleUrls: ['./eventeditor.component.sass']
})
export class EventeditorComponent implements OnInit {

  message="";
  showCode=false;
  showRefund=false;
  templates:any[]=[];
  selTemplate: any=null;
  editorOptions = {theme: 'vs-dark', language: 'yaml'};
  code:string="";

  constructor(
    public config:ConfigService,
    public router:Router,
    public toaster:MatSnackBar,
    public _location:Location,
    public api:ApiService
  ) {}



  ngOnInit() {
    this.api.gettemplates().subscribe((r:any[])=>{
      this.templates=r;
    });
  }



  openModele(template:any){
    this.selTemplate=template;
    this.api.get_yaml_code(this.config.user.address,template.filename).subscribe((code:any)=>{
      if(code.status==200){
        $$("Code="+code.data);
        this.code=code.data;
      }
    });
  }



  /**
   *
   */
  fictif(){
    var event=this.selTemplate.filename;
    var addr=this.config.user.address;
    this.api._get("add_event/"+event+"?format=json&owner="+addr+"&miner="+addr+"&fictif=True").subscribe((r:any)=>{
      this.config.reload_user(()=>{
        this.router.navigate(["store"],{queryParams:{onlyMyEvents:true}});
      });
    },(err)=>{
      showMessage(this,err.error.message);
      this.router.navigate(["search"]);
    });
  }




  sendDemo() {
    this.api.send_yaml_demo(this.config.user.email,this.selTemplate.filename).subscribe(()=>{
      showMessage(this,"Consultez votre boite mail");
    })
  }

  publish() {
    this.api._post("add_event/"+this.config.user.email,this.code).subscribe((r:any)=>{
      $$("result du add_event=",r);
      this.router.navigate(["store"],{queryParams:{onlyMyEvents:true}});
    })

  }
}
