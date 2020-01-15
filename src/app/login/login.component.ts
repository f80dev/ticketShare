import { Component, OnInit, Inject } from '@angular/core';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialService
} from "ngx-social-button";

import {$$, showError, showMessage} from "../tools";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  email = 'paul.dudule@gmail.com';
  message="L'authentification va permettre d'utiliser un même compte sur plusieurs appareils. Elle permet également de rendre vos promotions publiques donc visible sur la carte des promotions localisées";

  shareObj = {
    href: "FACEBOOK-SHARE-LINK",
    hashtag:"#FACEBOOK-SHARE-HASGTAG"
  };

  constructor(public api: ApiService,
              public router: Router,
              public toast:MatSnackBar,
              public config:ConfigService,
              private socialAuthService: SocialService) {

  }


  ngOnInit() {
  }


  updateUser(){
    // this.api.setuser(this.data.user).subscribe((res:any)=>{
    //   localStorage.setItem("user",res.user._id);
    //   this.dialogRef.close({user:res.user,message:"Vous êtes maintenant authentifier",code:200,force_refresh:true});
    // },(err)=>{showError(this,err)});
  }

  email_login(){
    // this.dialog.open(PromptComponent,{
    //   width:'90vw',data: {title:"Authentification par email",question:"Renseigner votre adresse mail pour recevoir le code de connexion"}}).afterClosed().subscribe((email:any) => {
    //   if(email){
    //     this.api.askforemail(email,this.data.user._id).subscribe((res:any)=>{
    //       if(res==null){
    //         this.dialogRef.close({"message":"Cette adresse mail n'est pas valide"});
    //       } else {
    //         if(res.status!=200){
    //           this.dialogRef.close({"message":res.message});
    //           return;
    //         } else {
    //           this.dialog.open(PromptComponent,{
    //             width:'90vw',data: {title:"Renseigner le code reçu"}})
    //             .afterClosed().subscribe((code:any) => {
    //             this.api.checkCode(this.data.user._id,code,"code").subscribe((res_auth:any)=>{
    //               if(res_auth.status==200){
    //                 this.data.user.email=email;
    //                 this.data.user.pseudo = this.data.user.email.split("@")[0].replace("."," ").split(" ")[0];
    //                 this.data.user.pseudo=this.data.user.pseudo.substr(0,1).toUpperCase()+this.data.user.pseudo.substr(1).toLowerCase();
    //                 this.initUser(email,true);
    //               } else {
    //                 this.dialogRef.close({"message":"Le code saisie est incorrect"});
    //               }
    //             });
    //           });
    //         }
    //       }

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

  initUser(data:any,askForCode=false){
    this.api.setuser(this.config.user._id,{"email":data.email,"pseudo":data.firstname}).subscribe((r:any)=>{
      if(r!=null && r._id!=null){
        showMessage(this,"Profil mis à jour")
        this.config.user=r;
      }

    })
    // this.api.getuser(email).subscribe((u:any)=>{
    //   if(u.code==500){
    //     $$("L'email "+email+" n'était pas encore enregistré. On l'affecte au compte existant");
    //     this.updateUser();
    //   } else {
    //     $$("L'email "+email+" est déjà utilisé par le compte "+u._id);
    //     if(u._id!=localStorage.getItem("user")){
    //       if(this.data.user.coupons.length>0 || this.data.user.shops.length>0){
    //         this.dialog.open(PromptComponent, {width: '250px',data: {title: "Compte déjà présent", question:"Cet email correspond à un autre compte, si vous souhaitez vous y connecté vous perder le compte actuel", onlyConfirm: true}
    //         }).afterClosed().subscribe((result) => {
    //           if(result=="yes"){
    //
    //             if(!askForCode){
    //               $$("On change l'attribution du compte")
    //               localStorage.setItem("user",u._id);
    //             } else {
    //               this.dialog.open(PromptComponent, {width: '250px',data: {title: "Donner le code de sécurité"}}).afterClosed().subscribe((code) => {
    //                 if(code!=null && code==u["code"]){
    //                   $$("On change l'attribution du compte, le code est exacte")
    //                   localStorage.setItem("user",u._id);
    //                 }
    //               });
    //             }
    //
    //
    //           }
    //           this.dialogRef.close({user:u,message:"Vous êtes reconnecter sur votre compte "+u.email});
    //         });
    //       } else {
    //         $$("Le compte n'avait aucun coupon ni magazin donc on s'en déconnecte sans poser de question")
    //         localStorage.setItem("user",u._id);
    //         this.dialogRef.close({user:u,message:"Vous êtes reconnecter sur votre compte "+u.email});
    //       }
    //     } else {
    //       $$("!Il s'agit d'une reconnexion au compte déjà enregistré, normalement c'est une erreur")
    //     }
    //   }
    // });
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_TYPE;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_TYPE;
    }

    $$("Appel de la plateforme d'authentification "+socialPlatform);

    this.socialAuthService.signIn(socialPlatformProvider).then((socialUser) => {

        this.initUser({"email":socialUser.email,"firstname":socialUser.name.split(" ")[0],"photo":socialUser.image});
      },
      (err)=>{showError(this,err);}
    );
  }
}
