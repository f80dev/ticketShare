import { Component, OnInit } from '@angular/core';
import {IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {ConfigService} from '../config.service';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {$$, createOrder, showMessage} from '../tools';
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

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    this.order = JSON.parse(params.get('order'));
    if(!params.has("order"))this.router.navigate(["home"]);
    // tslint:disable-next-line:triple-equals
    if (this.order.total == 0) {
      this.buy('gratuit');
    } else {
      this.api.getevent(this.order.event).subscribe((r) => {
        this.event = r;
        this.tickets=this.getTicketsForOrder(r);
        $$("Initialisation des tickets effectués");
      });
    }
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
    this.api.sendpayment("account",this.config.user.email,data).subscribe(()=>{
      this.config.reload_user();
      this.buy("paypal");
    });
  }


  refresh_balance() {
    this.config.reload_user();
  }
}
