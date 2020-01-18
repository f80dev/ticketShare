import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from './config.service';
import {MatDialog, MatSidenav, MatSnackBar} from '@angular/material';
import {PromptComponent} from './prompt/prompt.component';
import {ApiService} from './api.service';
import {Location} from "@angular/common";
import {Socket} from "ngx-socket-io";
import {subscribe_socket,$$,showMessage} from "./tools";
import Web3 from "web3";
import set = Reflect.set;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showFiller = false;
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;

  constructor(public config: ConfigService,
              public dialog: MatDialog,
              public api: ApiService,
              public toast:MatSnackBar,
              public socket:Socket,
              //@Inject(WEB3) private web3: Web3,
              public _location: Location) {
    config.init(()=>{
      this.api.infos().subscribe((infos:any)=>{
        config.infos_server=infos;
      })
    });
    this.initUser();
  }

  create_user(result){
    this.api.adduser(result).subscribe((r: any) => {
      this.config.user = r;
      localStorage.setItem('address', r._id);
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
   */
  initUser():void {
    const address = localStorage.getItem('address');
    if (!address){
      //TODO: intégrer la problématique d'obsolescence des cookies
      $$("Pas de compte connu sur ce device")
      this.create_user("");
    } else {
      $$("Récupération du compte "+address)
      this.api.getuser(address).subscribe((r: any) => {
        this.config.user = r;
      },(err)=>{
        $$("Le compte à été supprimé de la base de donnée");
        localStorage.removeItem("address");
        this.initUser();
      });
    }
  }

  ngOnInit(): void {
    subscribe_socket(this,"refresh_sell");
    subscribe_socket(this,"refresh_buy",()=>{
      this.initUser();
      localStorage.removeItem("dtBuy");
    });

    //TODO: intégrer https://medium.com/b2expand/inject-web3-in-angular-6-0-a03ca345892
    // if ('enable' in this.web3.currentProvider) {
    //   this.web3.currentProvider.enable();
    // }
    // const accounts = this.web3.eth.getAccounts();

    setTimeout(()=>{
      if(this.config.width_screen>=400 && this.drawer!=null)this.drawer.open();
    },500);


  }

  logout() {
    localStorage.removeItem('address');
    window.location.reload();
  }

  closeMenu(){
    if(this.config.width_screen<400)this.drawer.close();
  }
}
