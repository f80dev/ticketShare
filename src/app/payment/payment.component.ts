import { Component, OnInit } from '@angular/core';
import {IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {ConfigService} from '../config.service';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {$$, showMessage} from '../tools';
import {stringify} from 'querystring';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {
  showRefund=false;
  order: any = {};
  message = '';
  private event: any = null;
  tickets=null;


  constructor(public config: ConfigService,
              public toast: MatSnackBar,
              public router: Router,
              public _location: Location,
              public route: ActivatedRoute,
              public api: ApiService) { }

  public payPalConfig ?: any;
  amount_to_credit: number=0;

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    this.order = JSON.parse(params.get('order'));
    if(!params.has("order"))this.router.navigate(["home"]);
    // tslint:disable-next-line:triple-equals

    this.api.getevent(this.order.event).subscribe((r) => {
      this.event = r;
      this.tickets=this.getTicketsForOrder(r);
      this.config.reload_user(()=>{
        this.amount_to_credit=Math.round(this.config.user.money-this.order.total+0.5);
      });
      $$("Initialisation des tickets effectués");
    });

  }




  /**
   * retourne les billets pour la facture paypal
   */
  getTicketsForOrder(_event) {
    const rc = [];
    if(_event==null)return rc;

    for (const t of this.order.tickets) {
      const _t = _event.tickets[t];
      rc.push({
        name: _event.name,
        quantity: '1',
        unit_amount: {currency_code: "EUR",value: _t.price.toString()}
      });
    }
    $$("liste des tickets à acheter ",rc);
    return rc;
  }



  resetStatus() {

  }

  buy(paymentMode= 'ether') {
    this.message = 'Validation de la transaction';
    this.api.buy(paymentMode, this.order.client, this.order.tickets, this.order.event).subscribe((r: any) => {
        this.message = '';
        if (r != null) {
          localStorage.setItem('dtBuy', stringify(new Date().getTime()));
          showMessage(this, 'Enregistrement de la tansaction dans la blockchain');
          this.router.navigate(['myevents'], {queryParams: {event: this.order.idEvent}});
        }
      }
      , (err) => {
        this.message = '';
        showMessage(this, 'Annulation de la réservation, ' + err.message);
      }
    );
  }

  onpayment(data){
    this.config.reload_user(()=>{
      if(this.config.user.money>this.order.total)
        this.buy("paypal");
    });
  }


  refresh_balance() {
    this.onpayment({});
  }
}
