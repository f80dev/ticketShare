import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {showMessage, $$, checkLogin} from '../tools';
import {ApiService} from '../api.service';
import {MatSnackBar} from "@angular/material";


@Component({
  selector: 'app-eventeditor',
  templateUrl: './eventeditor.component.html',
  styleUrls: ['./eventeditor.component.sass']
})
export class EventeditorComponent implements OnInit {

  selectCategorie="divers";
  message="";
  showCode=false;
  showRefund=false;
  templates:any[]=[];
  selTemplate: any=null;
  editorOptions = {theme: 'vs-dark', language: 'yaml'};
  code:string="";
  private showPublish: boolean=false;
  cats=[];

  select_prop:any={};
  properties:string[]=[];
  yaml_help:any=null;


  constructor(
    public config:ConfigService,
    public router:Router,
    public route: ActivatedRoute,
    public toaster:MatSnackBar,
    public _location:Location,
    public api:ApiService
  ) {}



  ngOnInit() {
    checkLogin(this);

    this.message="Chargement des modèles";

    const params = this.route.snapshot.queryParamMap;
    if(params.has("event")){
      this.api.geteventastemplate(params.get("event")).subscribe((r)=>{
        this.openModele(r);
        this.message="";
      })
    } else {
      this.api.gettemplates().subscribe((r:any[])=>{
        this.templates=r;
        this.cats=[];
        for(let _t of r){
          if(this.cats.indexOf(_t.category)==-1)this.cats.push(_t.category);
        }
        this.message="";
      });
    }



    this.api._get("/yaml_properties").subscribe((r:any)=>{
      this.properties=Object.keys(r);
      this.yaml_help=r;
    })
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
    this.message="Création de l'événement fictif";
    this.api._get("add_event/"+event+"?format=json&owner="+addr+"&miner="+addr+"&fictif=True").subscribe((r:any)=>{
      this.config.reload_user(()=>{
        this.router.navigate(["store"],{queryParams:{onlyMyEvents:true}});
      });
    },(err)=>{
      showMessage(this,err.error.message);
      this.router.navigate(["search"]);
    });
  }


  download_template() {
    open(this.config.infos_server.domain+"/api/get_yaml_file/"+this.selTemplate.filename);
  }


  sendDemo() {
    this.api.send_yaml_demo(this.config.user.email,this.selTemplate.filename).subscribe(()=>{
      showMessage(this,"Consultez votre boite mail");
    })
  }

  publish() {
    this.message="En cours de fabrication";
    this.api._post("add_event/"+this.config.user.email,this.code).subscribe((r:any)=>{
      this.message="Evenement fabriqué";
      $$("result du add_event=",r);
      setTimeout(()=>{
        this.router.navigate(["store"],{queryParams:{onlyMyEvents:true}});
      },500)
    })

  }

  check_event() {
    this.api._post("check_event/"+this.config.user.address,this.code).subscribe((result)=>{
      showMessage(this,"Evénement correct");
      this.showPublish=true;
    },(err:any)=>{
      showMessage(this,err.error.message);
      this.showPublish=false;
    });
  }


  updateCode(event){
    this.showPublish=false;
  }


  back_list(){
    const params = this.route.snapshot.queryParamMap;
    if(params.has("event")){
      this.router.navigate(["store"],{queryParams:{onlyMyEvents:true}});
    } else {
      this.selTemplate=null;
      this.showPublish=false;
      this.showCode=false;
    }

  }



  update_config(evt:any) {
    evt.stopPropagation();
    this.showPublish=false;
  }
}
