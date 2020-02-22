import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog, MatSnackBar} from "@angular/material";
import {$$, showMessage} from "../tools";
import {PromptComponent} from "../prompt/prompt.component";

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.sass']
})
export class ValidateComponent implements OnInit {
  to_burn=[];
  showScanner=true;
  message="";

  lastAddress="";
  tickets=[];
  address="";
  _event:any;
  _user:any;

  //http://localhost:4200/validate?event=1578905752

  constructor(public api: ApiService,
              public router:Router,
              public dialog: MatDialog,
              public config:ConfigService,
              public toast:MatSnackBar,
              public route: ActivatedRoute) {

  }


  //http://localhost:4200/?event=1582301601&command=validate
  ngOnInit() {
    var idEvent=localStorage.getItem("validation");
    if(idEvent==null && this.config.params!=null && this.config.params["event"]!=null && this.config.params["event"].length>0)idEvent=this.config.params["event"];
    if(idEvent==null){
      $$("impossible de rester dans validate sans indiquer l'événement a valider");
      this.router.navigate(["store"]);
    } else {
      this.api.getevent(idEvent).subscribe((r:any)=>{
        this._event=r;
        if(this.config.user.email.length==0 && r.checkers.indexOf("*")==-1) {
          this.router.navigate(["login"], {
            queryParams:
              {
                message: "La validation des événements nécessite d'être authentifié et autorisé par l'organisateur",
                redirect: "/validate?event=" + r._id
              }
          });
        }else{

          if (r.checkers.indexOf(this.config.user.email) == -1 && r.checkers.indexOf(this.config.user.address)==-1) {
            showMessage(this, "Vous ne faites pas partie de la liste des validateurs autorisés");
            this.router.navigate(["store"]);
          } else {
            localStorage.setItem("validation", r["_id"]);
          }
        }
      });
    }
  }


  /**
   *
   * @param addr
   */
  refresh(addr:string){
    this.lastAddress=addr;
    if(addr.length>0){
      this.message="Récupération des places du client";
      this.api.use(addr,this._event["_id"]).subscribe((r:any)=>{
        this.address="";
        this.message="";
        this.tickets=r.tickets;
        this._user=r.user;
        if(this.tickets.length==0){
          this.api.removeEvt(addr,this._event["_id"]).subscribe(()=>{});
          showMessage(this,"Pas de ticket pour cet événement");
          this.showScanner=true;
        }
      },()=>{
        this.message="";
      })
    }
  }





  onflash_event($event: any) {
    this.showScanner=false;
    this.refresh($event.data);
  }




  update_addr($event) {
    const addr=$event.currentTarget.value;
    if(addr!=null && addr.length==42 && addr.startsWith("0x")){
      this.onflash_event({data:addr});
    }
  }


  update_toburn(tickets:any){
    this.to_burn=tickets;
  }


  reload(){
    this.message="";
    this.showScanner=true;
    this.to_burn=[];
    this.tickets=[];
    this.refresh("");
  }

  burn(all=false) {
    if(all)this.to_burn=this.tickets;
    this.message="Validation du ticket";
    var tickets="";
    for(let t of this.to_burn){
      if(t.value!=null)
        tickets=tickets+t.value+","
      else{
        tickets=tickets+t._id+","
      }
    }

    this.api.burn(this.lastAddress,this._event["_id"],tickets.substr(0,tickets.length-1)).subscribe((r:any)=>{
      this.address="";
      if(r.status==200){
        showMessage(this,"Validation des "+this.to_burn.length+" ticket(s) effectué");
        this.reload();
      }
    },(err)=>{
      showMessage(this,err.message);
      this.reload();
    });
  }

  add_checker() {
    this.dialog.open(PromptComponent, {width: '250px',
      data: {
        title: 'Ajouter un validateur de billet',
        question: "Saisissez l'email du nouveau validateur pour "+this._event.name,
        result:"@",
        onlyConfirm: false,
        canEmoji: false,
        lbl_ok:"Ajouter",
        lbl_cancel:"Annuler"
      }
    }).afterClosed().subscribe((result) => {
      if(result!=null){
        var checkers=this._event.checkers;
        checkers.push(result);
        this.api.setevent(this._event._id,{checkers:checkers}).subscribe(()=>{
          showMessage(this,result+" va recevoir un mail pour la validation des billets");
          //TODO: remplacer par une api directe qui ajoute l'envoi d'email
        });
      }

    });

  }
}
