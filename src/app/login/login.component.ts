import { Component, OnInit, Inject } from '@angular/core';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialService
} from "ngx-social-button";

import {$$, clear, showError, showMessage} from "../tools";
import {ApiService} from "../api.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {ConfigService} from "../config.service";
import {PromptComponent} from "../prompt/prompt.component";
import {Location} from "@angular/common";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email = 'paul.dudule@gmail.com';
  message = "Pour enregistrer votre mail, vous pouvez utilisez Google ou Facebook, ou directement le saisir";
  wait_message="";
  redirect = null;
  code="";

  shareObj = {
    href: "FACEBOOK-SHARE-LINK",
    hashtag: "#FACEBOOK-SHARE-HASGTAG"
  };
  handle: any = null;
  messageCode:string="";

  constructor(public api: ApiService,
              public router: Router,
              public dialog: MatDialog,
              public toast: MatSnackBar,
              public _location: Location,
              public config: ConfigService,
              public route: ActivatedRoute,
              private socialAuthService: SocialService) {
  }


  ngOnInit() {
    $$("Ouverture de la fenêtre de login")
    var params: ParamMap = this.route.snapshot.queryParamMap;
    this.redirect = params.get("redirect");
    if (params.has("message")) this.message = params.get("message");
    if (params.has("address")) {
      $$("Récupération de l'adresse " + params.get("address"))
      localStorage.setItem("lastEmail", params.get("address"));
      this.email_login();
    }
  }



  next() {
    clearTimeout(this.handle);
    if (this.redirect == null)
      this.router.navigate(["search"]);
    else {
      if (this.redirect == "back" || this.config.user.email.length==0)
        this._location.back();
      else
        this.router.navigateByUrl(this.redirect);
    }
  }

  quit() {
    this.handle = setTimeout(() => {
      this.next();
    }, 20000);
  }

  updateUser() {
    // this.api.setuser(this.data.user).subscribe((res:any)=>{
    //   localStorage.setItem("user",res.user.address);
    //   this.dialogRef.close({user:res.user,message:"Vous êtes maintenant authentifier",code:200,force_refresh:true});
    // },(err)=>{showError(this,err)});
  }

  email_login() {
    $$("Ouverture du login par email");
    this.dialog.open(PromptComponent, {
      width: '90vw', data: {
        title: "Authentification par email",
        result: localStorage.getItem("lastEmail"),
        question: "Renseigner votre adresse mail ou votre adresse de wallet pour recevoir le code de connexion",
        lbl_ok: "OK",
        lbl_cancel: "Annuler"
      }
    }).afterClosed().subscribe((email: any) => {
      if (email) {
        localStorage.setItem("lastEmail", email);
        this.email=email;
        //Recherche d'un compte déjà existant

        this.api.getuser(email).subscribe((_old_user: any) => {
          if (_old_user != null) {
            this.messageCode="Le compte "+email+" existe déjà, veuillez indiquer son code à 6 chiffres";
          }
        }, (err:any) => {
          if(err.status==400)
            this.api.setuser(this.config.user._id, {"email": email}).subscribe((res: any) => {
              if (res != null) {
                this.messageCode="Afin de vérifier que vous êtes bien le propriétaire de " + email + ", veuillez indiquer le code à 6 chiffres que vous avez reçu";
              }
            });
        });
      }
    })

          // var message="Un lien de connexion à votre nouveau profil vous a été envoyer sur votre boite. Utilisez le pour vous reconnecter";
          // if(res.status!=200)message="Problème technique. Essayer une autre méthode d'authentification";
          // this.message=message;
          // setTimeout(()=>{
          //   this.dialogRef.close({"message":message});
          // },5000);
    //     })
    //   }
    // });

    //   var firstname=this.email.split("@")[0];
    // this.api.adduser(this.email,firstname).subscribe((res:any)=>{
    //   localStorage.setItem("code",res.code);
    //   res.message="Un lien est disponible dans votre boite "+this.email+" pour votre première connexion";
    //
    // },(error)=>{showError(this,error);});
  }

  signOut(){
    if(this.socialAuthService.isSocialLoggedIn()){
      this.socialAuthService.signOut().then(()=>{

      }).catch((err)=>{

      });
    }
  }

  resend_code(){
    this.api.resend(this.email).subscribe(()=>{
      showMessage(this,"Votre code d'accès a été renvoyé, consultez votre mail");
    });
  }



  updateCode(event){
    var code=event.target.value;

    this.wait_message="Vérification du code";

    this.api.checkCode(this.email, code).subscribe((r: any) => {
      this.wait_message="";
      if (r != null) {
          localStorage.setItem("address", r.address);
          if(r.address!=this.config.user.address){
            $$("On supprime le compte courant qui avait été créé");
            this.api.deluser(this.config.user.address).subscribe(() => {
              window.location.reload();
            });
          } else {
            showMessage(this, "Connexion vérifié, Profil mise a jour");
            this.config.user = r;
            this.messageCode="";
            this.quit();
          }
      } else {
        this.messageCode="";
        this.quit();
      }
    }, (err) => {
      this.wait_message="";
      this.code="";
      showMessage(this, "Code incorrect, veuillez recommencer la procédure");
    });
  }

  initUser(data:any,askForCode=false){
    $$("Recherche d'un compte ayant ce mail");
    this.api.getuser(data.email).subscribe((_old_user:any)=> {
      this.messageCode="Le compte "+_old_user.email+" existe déjà, veuillez indiquer son code à 6 chiffres";
        this.email=data.email;
    },(err)=>{
        $$("Il n'y a pas de compte à cet email");
        this.email=data.email;
        this.message="";
        this.api.setuser(this.config.user.address, {
          "email": data.email,
          "pseudo": data.firstname,
          "photo":data.photo || data.picture
        }).subscribe((r: any) => {
          if (r != null && r._id != null) {
            showMessage(this, "Profil mis à jour");
            this.config.user = r;
            this.quit();
          }
        }, () => {
          showMessage(this, "Problème de mise a jour, réessayez");
        })
      }
    );
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_TYPE;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_TYPE;
    }

    $$("Appel de la plateforme d'authentification "+socialPlatform);
    this.wait_message="Récupération de votre adresse mail via "+socialPlatform;
    this.socialAuthService.signIn(socialPlatformProvider).then((socialUser) => {
      this.wait_message="";
      this.message="";
      $$("Resultat de l'authentification ",socialUser);
        this.initUser({"email":socialUser.email,"firstname":socialUser.name.split(" ")[0],"photo":socialUser.image});
      },
      (err)=>{showError(this,err);}
    );
  }
}
