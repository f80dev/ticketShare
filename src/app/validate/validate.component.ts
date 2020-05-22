import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService} from "../config.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog, MatSnackBar} from "@angular/material";
import {$$, showMessage,isToday,getTime,checkLogin} from "../tools";
import {PromptComponent} from "../prompt/prompt.component";
import {A11yModule} from '@angular/cdk/a11y';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.sass']
})
export class ValidateComponent implements OnInit {
  to_burn=[];
  showScanner=false;
  message="";
  audio_ok=null;
  audio_ko=null;
  lastAddress="";
  tickets=[];
  all_tickets=[];
  address="";
  _event:any;
  _user:any;
  _identities:any[];
  _dates: any[]=[];

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
    $$("Chargement des fichiers audios");
    this.audio_ok = new Audio();this.audio_ok.src = "/assets/ok.mp3";this.audio_ok.load();
    this.audio_ko = new Audio();this.audio_ko.src = "/assets/ko.mp3";this.audio_ko.load();

    $$("Lecture de l'événement")
    var idEvent=this.config.params["event"];
    if(idEvent==null){
      showMessage(this,"impossible de rester dans validate sans indiquer l'événement a valider");
      this.router.navigate(["store"]);
    } else {
      if(checkLogin(this,{redirect:"validate",event:idEvent})){
        this.message="Récupération de l'ensemble des ventes";
        this.api.getevent(idEvent).subscribe((r:any)=>{
          this._event=r;
          this.api.getbalances(idEvent,true).subscribe((all:any)=>{
            this.message="";
            this.all_tickets=all;
            if(this.config.user!=null && this.config.user.email.length==0 && r.validate.checkers.indexOf("*")==-1) {
              this.router.navigate(["login"], {
                queryParams:
                  {
                    message: "La validation des événements nécessite d'être authentifié et autorisé par l'organisateur",
                    redirect: "/validate?event=" + r._id
                  }
              });
            }else{
              if (r.validate.checkers.indexOf(this.config.user.email) == -1 && r.validate.checkers.indexOf(this.config.user.address)==-1) {
                showMessage(this, "Vous ne faites pas partie de la liste des validateurs autorisés");
                this.router.navigate(["search"]);
              } else {
                localStorage.setItem("validation", r["_id"]);
              }
            }
          })
        },(err)=>{
          showMessage(this,"L'evenement à valider n'existe pas");
          this.router.navigate(['store']);
        });
      }
    }
  }


  getplaces(addr,idevent,func,func_error=null){
    if(addr.length<42){
      addr=addr.replace("#","")
      $$("On effectue une recherche sur la base de la référence du ticket")
      Object.keys(this.all_tickets).forEach((k)=>{
        if(k.startsWith("0x") && addr.length<42){
          this.all_tickets[k].forEach((t)=>{
            if(addr.length<42 && t.ref==addr && t.state=="sold"){
              addr=t.params;
            }
          });
        }
      });
    }

    if(addr.length==42 && this.all_tickets.hasOwnProperty(addr)) {
      $$("L'utilisateur est bien dans la liste des billets, on affiche le résultats")
      func({tickets: this.all_tickets[addr],photo:this.all_tickets["identities"][addr].photo,pseudo:this.all_tickets["identities"][addr].pseudo});
      return true;
    }


    $$("Le billet n'a pas été trouvé dans la dernière récupération, on interoge la blocchain");
    this.api.use(addr,this._event["_id"]).subscribe((r:any)=> {
      func(r);
    },()=>{
      func_error();
    });

  }


  /**
   *
   * @param addr
   */
  refresh(addr:string){
    this.lastAddress=addr;
    if(addr.length>0){
      this.message="Récupération des places du client";
      this.getplaces(addr,this._event["_id"],(r)=>{
        this.address="";
        this.message="";
        this.tickets=r.tickets;
        this._user={pseudo:r.pseudo,photo:r.photo};

        this._dates=[];
        for(let _t of this.tickets){
          if(this._dates.indexOf(_t.date)==-1)this._dates.push(_t.date);
        }
        if(this._dates.length==1){
          if(isToday(this._dates[0])){
            this._dates[0]="aujourd'hui "+getTime(this._dates[0]);
          } else {
            this._dates[0]=new Date(this._dates[0]*1000).toLocaleString();
          }

        }
        if(this.tickets.length==0){
          this.audio_ko.play();
          this.api.removeEvt(addr,this._event["_id"]).subscribe(()=>{});

          if(addr.length==42)
            showMessage(this,"Pas de ticket pour cet événement");
          else
            showMessage(this,"Référence incorrect ou billet non vendu");

          this.showScanner=true;
        } else {
          this.audio_ok.play();
          $$("Mise en oeuvre du processus de validation automatique");
          if(this._event.validate.auto_validate==1 && this.tickets.length==1){
            this.burn(true);
          }

          if(this._event.validate.auto_validate==2){
            this.burn(true);
          }

        }
      },()=>{
        this.message="";
      })
    }
  }





  onflash_event($event: any) {
    var addr=$event.data;
    addr=addr.replace("ethereum:","")
    this.refresh(addr);
    $event.data="";
  }




  update_addr($event) {
    const addr=$event.currentTarget.value;
    if(addr!=null){
      this.onflash_event({data:addr});
    }
  }


  update_toburn(tickets:any){
    this.to_burn=tickets;
  }


  reload(){
    $$("Rechargement des données");
    this.message="";
    this.showScanner=true;
    this.to_burn=[];
    this._dates=[];
    this.tickets=[];
    this.refresh("");
  }




  burn(all=false) {
    if(!this._event.validate.instant_burn)return(false);

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
        result:"",
        onlyConfirm: false,
        canEmoji: false,
        lbl_ok:"Ajouter",
        lbl_cancel:"Annuler"
      }
    }).afterClosed().subscribe((result) => {
      if(result!="no"){
        this.api.addchecker(result,this._event._id).subscribe(()=>{
          showMessage(this,result+" va recevoir un mail pour la validation des billets");
          this._event.validate.checkers.push(result);
        });
      }
    });
  }

  removeChecker(val) {
    this.api.delchecker(val,this._event._id).subscribe(()=>{
      showMessage(this,val+" n'est plus en charge des entrées");
      const index=this._event.validate.checkers.indexOf(val);
      if(index>-1)this._event.validate.checkers.splice(index,1);
    },(err)=>{
      showMessage(this,err.message);
    });
  }

  open_douchette(){
    open("https://app.kerberus.tech/assets/use.html?faq&idevent="+this._event._id+"&domain="+this.config.infos_server.domain);
  }

  open_scanner(){
    this.showScanner=true;
    showMessage(this,"Clicker sur le scanner pour l'éteindre");
  }
}
