import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from './config.service';
import {MatDialog, MatSidenav, MatSidenavContainer, MatSnackBar} from '@angular/material';
import {PromptComponent} from './prompt/prompt.component';
import {ApiService} from './api.service';
import {Location} from "@angular/common";
import {Socket} from "ngx-socket-io";
import {subscribe_socket,$$,showMessage} from "./tools";
import {ActivatedRoute, Router} from "@angular/router";
import Web3 from 'web3';
import { MonacoEditorModule } from 'ngx-monaco-editor';

// export const WEB3 = new InjectionToken<Web3>('web3', {
//   providedIn: 'root',
//   factory: () => {
//     try {
//       const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
//       return new Web3(provider);
//     } catch (err) {
//       throw new Error('Non-Ethereum browser detected. You should consider trying Mist or MetaMask!');
//     }
//   }
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showFiller = false;
  message="";
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;

  constructor(public config: ConfigService,
              public dialog: MatDialog,
              public api: ApiService,
              public toast:MatSnackBar,
              public socket:Socket,
              public route:ActivatedRoute,
              public router:Router,
              //@Inject(WEB3) private web3: Web3,
              public _location: Location) {

    config.init(()=>{
      this.api.infos().subscribe((infos:any)=>{
        config.infos_server=infos;
      })
    });

  }


  /**
   *
   * @param result
   */
  create_user(result,func){
    if(result==null)result="";
    this.api.adduser(result).subscribe((r: any) => {
      this.config.user = r;
      localStorage.setItem('address', r.address);
      func(r);
    },(err)=>{
      if(err.status==0)
        showMessage(this,"Le serveur n'est pas disponible, vérifier votre connexion ou essayer de vous reconnecter plus tard",0,()=>{
          this.initUser();
        },"Reconnexion");
      else{
        showMessage(this,"Adresse incorrecte "+err.message);
        this.initUser();
      }
    });
  }


  onResize() {
    if(this.config.width_screen>=800 && this.drawer!=null)this.drawer.open();
  }


  linkEmail(func){
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
      func(result_email);
    });
  }


  /**
   *
   * @param func
   */
  analyse_params(func) {
    var url=this._location.path(); //Ne récupére pas le domaine de l'url
    localStorage.setItem('firsturl', url);
    var params={};
    if(url!=null && url.indexOf("?")>=0) {
      url= this._location.path().split("?")[1];
      $$('Récupération des paramètres', url);
      for(let param of ["command","event","privatekey","address","faq"]){
        if(url.indexOf(param+"=")>-1)params[param]=url.split(param+"=")[1].split("&")[0];
      }
    }
    $$('Netoyage de l\'url de lancement:' + this._location.path());
    this._location.replaceState(this._location.path().split('?')[0], '');
    this._location.replaceState(this._location.path().split('/home')[0], '');

    $$("Appel du callback avec params=",params);
    this.config.params=params;
    func(params);
  }



  /**
   * Chargement du cookier pour restauration du compte du device
   */
  initUser(text=""):void {
    //TODO: tous les paramètres transmis ici doivent être encrypté
    $$("Initialisation de l'utilisateur, recupération de l'adresse de wallet du device");
    const address = localStorage.getItem('address');
    $$("Address récupérée sur le device ", address);

    if (!address) {
      //TODO: intégrer la problématique d'obsolescence des cookies
      $$("Pas de compte connu sur ce device");
      this.message = "Premier lancement sur ce terminal, création d'un nouveau compte";
      $$("Pas de compte connu, Appel de create_user avec text=", text);
      this.create_user(text, (u) => {
        this.message = "";
        showMessage(this, "Nouveau compte créé");
        this.onResize();
      });
    } else {
      this.message="Reconnexion au compte "+address;
      this.api.getuser(address,30).subscribe((r: any) => {
        if(text!=r.address){
          $$("On ne tient pas compte de l'adresse qui a été passé en argument, pour l'utiliser il faut d'abord se déconnecter du compte existant")
        }

        this.message="";
        this.config.user = r;
      },(err)=>{
        if(err.status==400){
          showMessage(this,"Le compte à été supprimé de la base de donnée, on le supprime du device et on redémarre l'application");
          localStorage.removeItem("address");
          setTimeout(()=>{this.initUser();},1000);
        } else
          showMessage(this,err.message);
      });
    }
  }

  ngOnInit(): void {

    $$("Vérification de la connexion")
    this.api.infos().subscribe((r:any)=>{
      $$("Infos du serveur : ",r);
    })


    subscribe_socket(this,"refresh_sell");

    subscribe_socket(this,"refresh_buy",(mes,data)=>{
      localStorage.removeItem("dtBuy");
      this.router.navigate(["myevents"],{queryParams:{event:data.param.event}})
    });

    //TODO: intégrer https://medium.com/b2expand/inject-web3-in-angular-6-0-a03ca345892
    // if ('enable' in this.web3.currentProvider) {
    //   this.web3.currentProvider.enable();
    // }
    // const accounts = this.web3.eth.getAccounts();

    setTimeout(()=>{
      this.analyse_params((p:any)=>{
        if(localStorage.getItem("address")!=null){
          $$("Avant toute tentative de connexion via les paramétres c'est le device qui prime");
          this.initUser();
        }
        else{
          if(p["address"]!=null){
            $$("A priori on cherche une connexion par email "+p["address"]);
            this.dialog.open(PromptComponent, {width: '250px',
              data: {
                title: 'Accès à votre compte',
                question: "Veuillez renseigner votre code d'accès à 6 chiffres pour votre wallet associé à "+p["address"],
                onlyConfirm: false,
                emojis: false,
                type: "number",
                lbl_ok:"Valider",
                lbl_cancel:"Annuler"
              }
            }).afterClosed().subscribe((code) => {
              this.api.checkCode(p["address"],code).subscribe((r)=>{
                if(r!=null){
                  localStorage.setItem("address",r["address"]);
                  this.initUser();
                }
              },(err)=>{
                showMessage(this,"Connexion sur un nouveau compte");
                this.initUser();
              });
            });
          }

          if(p["privatekey"]!=null){
            this.initUser(p["privatekey"]);
          }
          else{
            if(p["address"]!=null){
              this.initUser(p["address"]);
            } else {
              this.initUser();
            }
          }
        }


        if(p.hasOwnProperty("event")){
          if(p["command"]=="validate"){
            this.router.navigate(["validate"],{queryParams:{event:p["event"]}});
          }

          if(p["command"]=="store"){
            this.router.navigate(["store"],{queryParams:{event:p["event"]}});
          }
        }

        if(p.hasOwnProperty("faq")){
          this.router.navigate(["faqs"],{queryParams:{open:p["faq"]}});
        }

        if(p["command"]=="myevents"){
          this.router.navigate(["myevents"]);
        }

      });
      if(this.config.width_screen>=800 && this.drawer!=null)this.drawer.open();
    },500);


  }

  logout() {
    this.dialog.open(PromptComponent, {width: '250px',
      data: {
        title: 'Deconnexion',
        question: "Etes vous sûr de vouloir vous déconnecter de "+this.config.user.email+" ?",
        onlyConfirm: true,
        canEmoji: false,
        lbl_ok:"Oui",
        lbl_cancel:"Annuler"
      }
    }).afterClosed().subscribe((result_email) => {
      localStorage.removeItem('address');
      window.location.reload();
    });

  }

  closeMenu(){
    if(this.config.width_screen<800)this.drawer.close();
  }
}
