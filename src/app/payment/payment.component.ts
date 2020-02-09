import { Component, OnInit } from '@angular/core';
import {IPayPalConfig,ICreateOrderRequest } from "ngx-paypal";
import {ConfigService} from "../config.service";
import {MatSnackBar} from "@angular/material";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {$$,showMessage} from "../tools"
import {stringify} from "querystring";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {
  private showCancel: boolean;
  private showSuccess: boolean;
  private showError: boolean;

  order:any={};
  message:string="";
  private event:any=null;


  constructor(public config:ConfigService,
              public toast:MatSnackBar,
              public router:Router,
              public _location:Location,
              public route:ActivatedRoute,
              public api:ApiService) { }

  public payPalConfig ? : {
    currency: string;
    clientId: string;
    createOrderOnClient: (data) => ICreateOrderRequest; advanced: { commit: "true" };
    style: { label: string; layout: string };
    onApprove: (data, actions) => void;
    onClientAuthorization: (data) => void;
    onCancel: (data, actions) => void;
    onError: (err) => void;
    onClick: (data, actions) => void
  };

  ngOnInit(): void {
    this.initConfig();
    const params=this.route.snapshot.queryParamMap;
    this.order=JSON.parse(params.get("order"));
    if(this.order.total==0)
      this.buy("gratuit");
    else{
      this.api.getevent(this.order.event).subscribe((r)=>{
        this.event=r;
      })
    }
  }

  getTicketsForOrder(){
    var rc=[];
    for(let t of this.order.tickets){
      var _t=this.event.tickets[t];
      rc.push({
        name: this.event.name+" "+_t.description,
        quantity: '1',
        category: 'tickets',
        unit_amount: {
          currency_code: 'EUR',
          value: _t.price,
        },
      });
    }
    return rc;
  }

  resetStatus(){

  }

  buy(paymentMode="ether"){
    this.api.buy(paymentMode,this.order.client,this.order.tickets,this.order.event).subscribe((r:any)=>{
        this.message="";
        if(r!=null){
          localStorage.setItem("dtBuy",stringify(new Date().getTime()));
          showMessage(this,"Enregistrement de la tansaction dans la blockchain");
          this.router.navigate(["myevents"],{queryParams:{event:this.order.idEvent}});
        }
      }
      ,(err)=>{
        this.message="";
        showMessage(this,"Annulation de la réservation, "+err.message);
      }
    )
  }

  private initConfig(): void {
    var clientId="AeEOnV5osIW2qTWbAxTGwOMOuyZvAJ8CUtCDn0Lr5-eeHGJhUHCkuAl0foZ0hkYGKNo9mtJP0nklI0tD"
    this.payPalConfig = {
      currency: 'EUR',
      clientId: clientId,
      createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.order.total,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.order.total
              }
            }
          },
          items: this.getTicketsForOrder()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        $$('onApprove - transaction was approved, but not authorized', data);
        actions.order.get().then(details => {
          $$('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        this.buy("paypal");
      },
      onCancel: (data, actions) => {
        $$('OnCancel', data);
        this.showCancel = true;

      },
      onError: err => {
        $$('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        $$('onClick', data);
        this.resetStatus();
      },
    };
  }
}
