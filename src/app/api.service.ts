import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {api,ADMIN_PASSWORD} from './tools';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) {}

  user:any=null;

  _get(url){
    return this.http.get(api(url));
  }

  raz() {
    localStorage.removeItem('address');
    return this.http.get(api('raz/hh4271'));
  }

  getusers() {
    return this.http.get(api("getusers/"+ADMIN_PASSWORD));
  }

  job(iter=0) {
    return this.http.get(api("job/"+iter));
  }

  getevents(userid:string=""){
    return this._get("events/"+userid);
  }


  askforemail(email: string,userid:string) {
    return this.http.get(api("askforemail/"+email+"/"+userid));
  }

  searchImage(query:string,limit:number,token:string){
    var url="https://server.f80.fr:5800/api/"+query+"?limit="+limit+"&quality=true";
    return this.http.get(url,{'headers':{"access_token":token}});
  }

  checkCode(userid: string, code: string,field:string) {
    return this.http.get(api("checkcode/"+userid+"/"+code+"/"+field));
  }

  convert(url:string) {
    return this.http.post(api("convert"),url);
  }


  setuser(id:string,body:any) {
    return this.http.post(api("setuser/"+id),body);
  }


  adduser(result: string) {
    return this._get("adduser/"+result);
  }

  getuser(address: string) {
    return this._get("getuser/"+address);
  }

  available(event:string,buyer: string) {
    return this._get("available/"+event+"/"+buyer);
  }

  getevent(_id:string){
    return this._get("getevent"+"/"+_id);
  }

  use(address: any, event: string) {
    return this._get("use/"+address+"/"+event);
  }

  burn(tickets: string) {
    return this._get("burn/"+tickets);
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

  transfert(_from:string,_to: string,ticketid:string) {
    return this._get("transfer/"+_from+"/"+_to+"/"+ticketid);
  }

  buy(buyer:string,tickets: string[],event:string) {
    var ticket=tickets.join(",");
    return this._get("buy/"+buyer+"/"+ticket+"/"+event);
  }
}
