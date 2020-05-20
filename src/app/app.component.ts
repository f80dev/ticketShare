import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from './config.service';
import {MatDialog, MatSidenav,  MatSnackBar} from '@angular/material';
import {PromptComponent} from './prompt/prompt.component';
import {ApiService} from './api.service';
import {Location} from "@angular/common";
import {Socket} from "ngx-socket-io";
import {subscribe_socket, $$, showMessage, askForAuthent} from "./tools";
import {ActivatedRoute, Router} from "@angular/router";
import {fromEvent,Observable,Subscription} from "rxjs";

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
export class AppComponent implements OnInit,OnDestroy {

  onlineEvent: Observable<Event> = fromEvent(window, 'online');
  offlineEvent: Observable<Event> = fromEvent(window, 'offline');
  subscriptions: Subscription[] = [];

  showFiller = false;
  showIntro = true;
  message = "";
  @ViewChild('drawer', {static: false}) drawer: MatSidenav;
  showZoneOptions = false;

  constructor(public config: ConfigService,
              public dialog: MatDialog,
              public api: ApiService,
              public toast: MatSnackBar,
              public socket: Socket,
              public route: ActivatedRoute,
              public router: Router,
              //@Inject(WEB3) private web3: Web3,
              public _location: Location) {

    config.init(() => {
      this.message = "Connexion en cours ...";
      this.api.infos().subscribe((infos: any) => {
        this.message = "";
        config.infos_server = infos;
        this.showZoneOptions = true;
      }, () => {
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      })
    });

  }

  ngOnInit(): void {
    this.init_event_for_network_status();

    $$("Positionnement des événements")
    subscribe_socket(this, "refresh_sell");
    subscribe_socket(this, "refresh_buy", (mes, data) => {
      localStorage.removeItem("dtBuy");
      this.router.navigate(["myevents"], {queryParams: {event: data.param.event}})
    });

    //TODO: intégrer https://medium.com/b2expand/inject-web3-in-angular-6-0-a03ca345892
    // if ('enable' in this.web3.currentProvider) {
    //   this.web3.currentProvider.enable();
    // }
    // const accounts = this.web3.eth.getAccounts();

    setTimeout(() => {

      $$("Initialisation de l'utilisateur, recupération de l'adresse de wallet du device");

      const address = localStorage.getItem('address');
      if (address) {
        $$("Address récupérée sur le device " + address + ". On se reconnecte au compte");
        this.message = "Reconnexion a votre compte";
        this.showZoneOptions = false;
        this.showIntro = false;
        this.api.getuser(address, 30).subscribe((r: any) => {
          // if(address!=r.address){
          //   $$("On ne tient pas compte de l'adresse qui a été passé en argument, pour l'utiliser il faut d'abord se déconnecter du compte existant")
          // }
          this.config.user = r;
          this.analyse_params((p: any) => {
            this.use_params(p);
          });
        }, (err) => {
          if (err.status == 400) {
            showMessage(this, "Le compte à été supprimé de la base de donnée, on le supprime du device et on redémarre l'application");
            localStorage.removeItem("address");
            setTimeout(() => {
              window.location.reload();
            }, 500);

          } else
            showMessage(this, err.message);
        });
      } else {
        $$("Première connexion sur ce device");
        this.analyse_params((p: any) => {
          this.use_params(p);
        });
      }
    }, 200);

    setTimeout(() => {
      this.onResize();
    }, 2000);
    setTimeout(() => {
      this.onResize();
    }, 8000);
  }


  init_event_for_network_status() {
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.api.connectionStatus = true;
      showMessage(this, "Connexion retrouvée")
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.api.connectionStatus = false;
      showMessage(this, "Connexion perdue");
    }));
  }


  /**
   *
   * @param result
   */
  create_user(info, func, func_error) {
    if (info == null) info = "";
    this.api.adduser(info).subscribe((r: any) => {
      this.config.user = r;
      localStorage.setItem('address', r.address);
      func(r);
    }, (err) => {
      if (err.status == 0)
        showMessage(this, "Le serveur n'est pas disponible, vérifier votre connexion ou essayer de vous reconnecter plus tard", 0, () => {
          this.initUser();
        }, "Reconnexion");
      else {
        func_error();
      }
    });
  }


  onResize() {
    if (this.config.width_screen >= 800 && this.drawer != null)
      this.drawer.open();
  }


  linkEmail(func) {
    this.dialog.open(PromptComponent, {
      width: '250px',
      data: {
        title: 'Indiquer votre mail',
        question: "Je dois vous envoyez certaines informations confidentielles sur votre nouveu wallet. Pouvez-vous m'indiquer votre mail",
        result: "hhoareau@gmail.com",
        onlyConfirm: false,
        canEmoji: false,
        lbl_ok: "Envoyer",
        lbl_cancel: ""
      }
    }).afterClosed().subscribe((result_email) => {
      func(result_email);
    });
  }


  /**
   *
   * @param func
   * Attention: il est nécéssaire d'ajouter chaque nouveau paramètre à la fonction
   */
  analyse_params(func, url = "") {
    if (url.length == 0)
      url = this._location.path(); //Ne récupére pas le domaine de l'url

    localStorage.setItem('firsturl', url);
    var params = {};
    if (url != null && url.indexOf("?") >= 0) {
      url = url.split("?")[1];
      $$('Récupération des paramètres', url);
      for (let param of ["command", "event", "privatekey", "address", "faq", "code", "new", "debug"]) {
        if (url.indexOf(param + "=") > -1) params[param] = url.split(param + "=")[1].split("&")[0];
      }
    }
    if (this._location.path().indexOf("?") >= 0) {
      $$('Netoyage de l\'url de lancement:' + this._location.path());
      this._location.replaceState(this._location.path().split('?')[0], '');
      this._location.replaceState(this._location.path().split('/home')[0], '');
    }

    $$("Appel du callback avec params=", params);
    this.config.params = params;
    func(params);
  }


  /**
   * Chargement du cookier pour restauration du compte du device
   */
  initUser(text = "", func = null): void {
    //TODO: tous les paramètres transmis ici doivent être encrypté
    this.message = "Premier lancement sur ce terminal, création d'un nouveau compte";
    this.showIntro = false;
    $$("Pas de compte connu, Appel de create_user avec text=", text);
    this.create_user(text, (u) => {
      this.message = "";
      this.onResize();
      this.showIntro = false;
      showMessage(this, "Nouveau compte créé");
      if (func != null) func();
    }, (err) => {
      showMessage(this, "Ce compte existe déjà");
      localStorage.removeItem("address");
    });
  }


  /**
   * Cette fonction est appelée pour traiter les paramétres
   * @param p
   */
  use_params(p: any) {
    //ex: http://localhost:4200/?address=0x34b1d8eD88a43a4b85B9aC5550ad4fDDEe3872Aa&code=410518

    $$("Gestion du drapeau de debug");
    if (!p.hasOwnProperty("debug")) p["debug"] = "0";
    localStorage.setItem("debug", p["debug"]);


    $$("On commence par évaluer la page que l'on va devoir prendre");
    var redirect = "";
    if (p.hasOwnProperty("command")) redirect = p["command"];
    $$("Page de débranchement " + redirect);

    if(p.hasOwnProperty("faq")){
      $$("Demande d'ouverture des FAQs");
      this.router.navigate(["faqs"],{queryParams:{open:p["faq"]}});
    }

    if (this.config.user == null){
      $$("On ne connait pas l'utilisateur");

      var info_for_user_create="";
      if(p.hasOwnProperty("address")) {
        this.showIntro=false;
        $$("Le paramétre address force une connexion sur " + p["address"]);
        info_for_user_create = p["address"];

        if (p.hasOwnProperty("code")) {
          $$("Le lancement doit immédiatement se reconnecter sur " + p["address"]);
          var code = p["code"];
          this.api.checkCode(p["address"], code).subscribe((r) => {
            if (r != null) {
              $$("Le code est vérifié, on initialise l'utilisateur");
              localStorage.setItem("address", r["address"]);
              this.config.user = r;
            }
          });
        } else {
          $$("Le code n'a pas été transmit donc on le demande en débranchant vers login");
          this.initUser("",()=>{
            this.router.navigate(["login"], {queryParams: {address: p["address"], redirect: redirect,event:p["event"]}});
            return;
          });
          // this.dialog.open(PromptComponent, {
          //   width: '350px',
          //   data: {
          //     title: 'Accès à votre compte',
          //     question: "Bonjour "+p["address"]+". Veuillez renseigner votre code d'accès à 6 chiffres",
          //     onlyConfirm: false,
          //     emojis: false,
          //     type: "number",
          //     lbl_ok: "Valider",
          //     lbl_cancel: "Annuler"
          //   }
          // }).afterClosed().subscribe((code) => {
          //   this.api.checkCode(p["address"], code).subscribe((r) => {
          //     if (r != null) {
          //       localStorage.setItem("address", r["address"]);
          //       this.config.user=r;
          //       window.location.reload();
          //     }
          //   }, (err) => {
          //     showMessage(this, "Connexion sur un nouveau compte");
          //     this.initUser();
          //   });
          // });
        }
      }
      if(p.hasOwnProperty("privatekey"))info_for_user_create=p["privatekey"]
      $$("On demande sa fabrication avec le paramètre "+info_for_user_create);

      if(info_for_user_create.length>0)this.initUser(info_for_user_create,()=>{});

    } else {
      $$("On connait l'utilisateur à l'adresse "+this.config.user._id);
      this.router.navigate([redirect],{queryParams:{event:p["event"]}})

      this.showIntro=false;
      if(redirect.length==0){
        $$("On utilise le profil du compte pour orienter vers l'écran le plus pertinent");
        if(this.config.user.myevents.online>0 || this.config.user.myevents.draft>0)redirect="/store?onlyMyEvents=true";
        if(this.config.user.mytickets>0)redirect="myevents";
      }
    }


    if(redirect.startsWith("/"))
      this.router.navigateByUrl(redirect);
    else
      this.router.navigate([redirect], {queryParams: {event: p["event"]}});
  }





  import_wallet() {
    /**
     * Rattache un wallet existant
     * @param func callback
     */
    this.dialog.open(PromptComponent, {width: '250px',
      data: {
        title: 'Rattachez un wallet',
        question: "Renseigné la clé privée de votre wallet",
        result:"567E753E69EB31B532272697D687B6D607BBE86A0A699148F9A81541582724C8",
        onlyConfirm: false,
        canEmoji: false,
        lbl_ok:"Ok",
        lbl_cancel:"Annuler"
      }
    }).afterClosed().subscribe((result_key) => {
      if(result_key!=null && result_key.length>0){
        this.initUser(result_key);
      }
    });
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


  openMyTickets(){
    this.showIntro=false;
    this.initUser("",()=>{
      askForAuthent(this,"Vous devez vous authentifier pour accèder à vos billets","myevents");
    });
  }


  closeMenu(){
    if(this.config.width_screen<800)this.drawer.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  create_event() {
    this.showIntro=false;
    this.initUser("",()=>{
      this.router.navigate(['store'],{queryParams:{command:'create'}});
    });
  }
}
