import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from "../config.service";
import {ActivatedRoute, Router} from '@angular/router';
import {$$, checkLogin, showError, showMessage, tirage} from '../tools';
import {ICreateOrderRequest, ITax, ItemCategory, ITransactionItem, IUnitAmount} from 'ngx-paypal';
import {ApiService} from '../api.service';
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material";
import {ClipboardService} from "ngx-clipboard";
import {stringify} from "querystring";

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.sass']
})
export class RefundComponent implements OnInit {

  @Input("amounts") amounts=[];
  @Input("sandbox") sandbox=false;
  @Input("items") items:any=[];
  @Input("user") user:any={};
  @Input("show") show:boolean=true;
  @Input("title") title="";
  @Output('payment') onpayment: EventEmitter<any>=new EventEmitter();
  @Output('error') onerror: EventEmitter<any>=new EventEmitter();
  message="";

  constructor(public config:ConfigService,
              public router:Router,
              public toaster:MatSnackBar,
              public _location:Location,
              public clipboard:ClipboardService,
              public api:ApiService,
              public routes:ActivatedRoute) { }

  payPalConfig:any=null;
  amount=0;

  ngOnInit() {
    setTimeout(()=>{this.refresh();},500);
    if(this.amounts.length>=1 && this.amount==0)this.amount=this.amounts[0];
  }

  //TEsteur sb-iy3fn1051170@personal.example.com / pd4271!!
  createOrder(_user:any,items:ITransactionItem[],onPayment:Function,sandbox=false){
    var clientId = 'AeEOnV5osIW2qTWbAxTGwOMOuyZvAJ8CUtCDn0Lr5-eeHGJhUHCkuAl0foZ0hkYGKNo9mtJP0nklI0tD';
    if(sandbox)clientId="sb";
    let tmp_total=0;
    for(let item of items){
      tmp_total=tmp_total+Number(item["unit_amount"]["value"])
    }
    let total:string=""+tmp_total;

    let rc= {
      currency: 'EUR',
      clientId,
      createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: total
              }
            }
          },
          items: items
        }]
      },
      advanced: {
        commit: 'true'
      },
      payee:{
        email:"hhoareau@gmail.com"
      },
      payer:{
        name:{
          given_name:_user["pseudo"]
        },
        email_address:_user["email"]
      },
      style: {
        size: 'small',
        label: 'buynow',
        shap:'pill',
        color:'silver',
        tagline:false,
        layout: 'vertical'
      },

      onApprove: (data, actions) => {
        $$('onApprove - transaction was approved, but not authorized', data);
        actions.order.get().then(details => {
          $$('onApprove - you can get full order details inside onApprove: ', details);
        });
      },

      onClientAuthorization: (data) => {
        this.message="Authorisation";
        onPayment(data);
      },

      onCancel: (data, actions) => {
        showMessage(this,"Transaction annulée");
        this.message="";
      },

      onError: err => {
        showMessage(this,"Problème technique, recommencez");
        this.message="";
      },

      onClick: (data, actions) => {
        setTimeout(()=>{
          this.message="Transaction de rechargement en cours";
        },1000);
      }
    };

    $$("Création de la commande Paypal : ",rc);

    return rc;
  }

  refresh(){
    if(this.config.user!=null && this.items!=null){
      if(this.items.length>0){
        this.items[0].unit_amount.value=this.amount.toString();
        this.payPalConfig=this.createOrder(this.config.user.email,this.items,(data)=>{
          this.message="Mise a jour de votre compte";
          this.api.sendpayment(data).subscribe((r:any)=>{
            this.onpayment.emit({data:r});
            this.message="";
            this.show=false;
          },(err)=>{
            this.onerror.emit(err.status);
            this.message="";
            if(err.status==404)
              showMessage(this,"Pour des raisons de sécurité vous devez utilisez "+this.config.user.email+" comme compte paypal. Votre compte n'a pas été crédité");
            else{
              showError(this,err);
            }
          });
        },this.config.user.offer=='pilote')
      }
    }
  }



  informe_copy() {
    showMessage(this,"Adresse disponible dans le presse-papier");
  }


  faucet() {
    if(this.config.user.refunding){
      if(this.config.user.refunding.startsWith("http")){
        open(this.config.user.refunding,"_blank");
      }else{
        this.clipboard.copy(this.config.user.refunding);
        showMessage(this,"Commande de rechargement disponible dans le presse-papier");
      }
    }
  }
}
