import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { timeout} from 'rxjs/operators';
import {api,ADMIN_PASSWORD} from './tools';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) {}

  user:any=null;
  connectionStatus=true;

  _get(url,_timeoutInSec=60){
    return this.http.get(api(url)).pipe(timeout(_timeoutInSec*1000));
  }

  _post(url,body,_timeoutInSec=60){
    return this.http.post(api(url),body).pipe(timeout(_timeoutInSec*1000));
  }

  raz() {
    localStorage.removeItem('address');
    return this.http.get(api('raz/hh4271'));
  }

 addchecker(userid:string,eventid:string) {
    return this.http.get(api('addchecker/'+userid+"/"+eventid));
  }

 delchecker(userid:string,eventid:string) {
    return this.http.get(api('delchecker/'+userid+"/"+eventid));
  }

  search(query:string) {
    return this.http.get(api('search/'+query));
  }

  getbalances(idevent:string,withIdentities=false) {
    return this.http.get(api('balances/'+idevent+"/"+withIdentities));
  }

  gettemplates() {
    return this.http.get(api('templates'));
  }


  get_yaml_code(user:string,yaml_file:string) {
    return this.http.get(api('get_yaml_code/'+user+"/"+yaml_file));
  }

  get_yaml_file(user:string,yaml_file:string) {
    return this.http.get(api('get_yaml_file/'+user+"/"+yaml_file));
  }


  getfaqs() {
    return this.http.get(api('faqs'));
  }

  deluser(userid:string) {
    return this.http.get(api('deluser/'+userid));
  }

  send_yaml_demo(user_email:string,yaml_file:string="demo"){
    return this.http.get(api("send_yaml_demo/"+user_email+"/"+yaml_file));
  }

  getusers() {
    return this.http.get(api("getusers/"+ADMIN_PASSWORD));
  }

   job(iter=0) {
    return this.http.get(api("job/"+iter));
  }

  /**
   *
   * @param userid
   * @param sortField : peut
   * @param filterField
   */
  getevents(userid:string="",sortField:string="",filterField:string=""){
    var url="events/"+userid;
    if(sortField!="")url=url+"/"+sortField;
    if(filterField!="")url=url+"/"+filterField;
    return this._get(url);
  }


  askforemail(email: string,userid:string) {
    return this.http.get(api("askforemail/"+email+"/"+userid));
  }

  searchImage(query:string,limit:number,token:string){
    var url="https://server.f80.fr:5800/api/"+query+"?limit="+limit+"&quality=true";
    return this.http.get(url,{'headers':{"access_token":token}});
  }

  checkCode(email: string, code: string) {
    return this.http.get(api("checkcode/"+email+"/"+code));
  }

  convert(url:string) {
    return this.http.post(api("convert"),url);
  }


  gettokenforimagesearchengine() {
    return this.http.get("https://server.f80.fr:5800/auth?username=reducshare&password=hh");
  }


  setuser(id:string,body:any) {
    return this.http.post(api("setuser/"+id),body);
  }

  setevent(id:string,body:any) {
    return this.http.post(api("setevent/"+id),body);
  }


  adduser(result: string) {
    return this._get("adduser/"+result);
  }

  delevent(id: string) {
    return this._get("delevent/"+id);
  }

  sendevent(id: string,to:string) {
    return this._get("sendevent/"+id+"/"+to);
  }

  getuser(address: string,timeoutInSec=30) {
    return this._get("getuser/"+address,timeoutInSec);
  }

  available(event:string,buyer: string="") {
    if(buyer.length>0)buyer="/"+buyer;
    return this._get("available/"+event+buyer);
  }

  getevent(_id:string){
    return this._get("getevent"+"/"+_id);
  }


  use(address: any, event: string) {
    return this._get("use/"+address+"/"+event);
  }

  burn(ticket_owner:string,eventid:string,tickets: string) {
    return this._get("burn/"+eventid+"/"+tickets+"/"+ticket_owner);
  }

  infos() {
    return this._get("infos/");
  }

 resend(userid: string) {
    return this._get("resend/"+userid);
  }

  removeEvt(userid: string,evtid:string) {
    return this._get("remove_event/"+userid+"/"+evtid);
  }

  transfert(_from:string,_to: string,eventid:string,ticketid:string) {
    return this._get("transfer/"+_from+"/"+_to+"/"+eventid+"/"+ticketid);
  }

  buy(paymentMode:string,buyer:string,tickets: string[],event:string) {
    var ticket=tickets.join(",");
    return this._get("buy/"+paymentMode+"/"+buyer+"/"+ticket+"/"+event,3600);
  }

  sendpayment(data: any) {
    return this.http.post(api("sendpayment"),data);
  }
}
