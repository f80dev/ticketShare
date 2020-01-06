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

  raz(userid:string) {
    localStorage.removeItem('user');
    return this.http.get(api('raz/'+userid));
  }

  getusers() {
    return this.http.get(api("getusers/"+ADMIN_PASSWORD));
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


  adduser(result: string) {
    return this._get("adduser/"+result);
  }

  getuser(address: string) {
    return this._get("getuser/"+address);
  }

  available(event:string,buyer: string) {
    return this._get("available/"+event+"/"+buyer);
  }

  use(address: any, event: string) {
    return this._get("use/"+address+"/"+event);
  }

  burn(ticket: string) {
    return this._get("burn/"+ticket);
  }

 resend(userid: string) {
    return this._get("resend/"+userid);
  }

  removeEvt(userid: string,evtid:string) {
    return this._get("remove_event/"+userid+"/"+evtid);
  }

  buy(buyer:string,tickets: string[],event:string) {
    var ticket=tickets.join(",");
    return this._get("buy/"+buyer+"/"+ticket+"/"+event);
  }
}
