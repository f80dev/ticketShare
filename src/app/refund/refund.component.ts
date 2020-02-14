import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from "../config.service";
import {ActivatedRoute, Router} from '@angular/router';
import {checkLogin, createOrder, showError, showMessage, tirage} from '../tools';
import {ICreateOrderRequest, ITax, ItemCategory, IUnitAmount} from 'ngx-paypal';
import {ApiService} from '../api.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.sass']
})
export class RefundComponent implements OnInit {

  @Input("wallet") wallet:string="wallet spectacle";
  @Input("amounts") amounts=[5,10,20,50,100];
  @Input("sandbox") sandbox=false;
  @Input("items") items=[];
  @Input("title") title="";
  @Output('payment') onpayment: EventEmitter<any>=new EventEmitter();
  message="";


  constructor(public config:ConfigService,
              public router:Router,
              public _location:Location,
              public api:ApiService,
              public routes:ActivatedRoute) { }

  public payPalConfig ?:any;
  amount=5;


  ngOnInit() {
    if(this.amounts.length==1)
      this.amount=this.amounts[0];
    setTimeout(()=>{
      this.refresh();
    },500);

  }

  refresh(){
    if(this.config.user!=null && this.items!=null){
      this.items[0].unit_amount.value=this.amount.toString();
      this.payPalConfig=createOrder(this,this.config.user.email,this.items,(data)=>{
        this.message="Mise a jour de votre compte";
        this.api.sendpayment("account",this.config.user._id,data).subscribe(()=>{
          this.message="";
            this.config.reload_user(()=>{
              this.onpayment.emit();
            });
          },(err)=>{
          this.message="";
          showError(this,err);
        });
      },this.config.user.offer=='pilote')
    }
  }


}
