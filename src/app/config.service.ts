import { Injectable } from '@angular/core';
import {HttpClient} from '../../node_modules/@angular/common/http';
import { Location } from '@angular/common';
import {environment} from '../environments/environment';
import {initAvailableCameras, isLocal} from "./tools";
import {Platform} from "@angular/cdk/platform";
import {ApiService} from "./api.service";
import { DeviceDetectorService } from 'ngx-device-detector';
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  visibleTuto=false;
  values:any={};
  infos_server:any={};
  activeBrand=1;
  config:any=null;
  waiting:boolean=false;
  webcamsAvailable:number=0;
  width_screen=300;
  device:any={};
  params:any={};
  user:any=null;
  refresh_callback: () => void;



  constructor(private location: Location,
              private http: HttpClient,
              public platform:Platform,
              public deviceService: DeviceDetectorService,
              public api:ApiService){

    if(localStorage.getItem("activeBrand")!=null)
      this.activeBrand=Number(localStorage.getItem("activeBrand"));

    this.device={
      isMobile:this.deviceService.isMobile(),
      isTablet:this.deviceService.isTablet(),
      isDesktop:this.deviceService.isDesktop(),
      infos:this.deviceService.getDeviceInfo()
    }
  }




  async logo(): Promise<string> {
    let conf = await this.getConfig();
    return Promise.resolve(conf.logo);
  }


  /**
   * Retourne les tags
   * @param level
   */
  getTags(level=0){
    var tags=this.values.tags;
    if(this.values.brands[this.activeBrand]!=null && this.values.brands[this.activeBrand].tags!=null)
      tags=this.values.brands[this.activeBrand].tags;

    var rc=[];
    tags.split(",").forEach((tag)=>{
      if(this.config.tags_details[tag].level<=level)
        rc.push(tag);
    });

    return rc;
  }


  is_admin(){
    if(environment.domain_appli.indexOf('localhost')>-1)return true;
    if(this.values.users.admins.indexOf(this.user.email)>-1)return true;
    return false;
  }


  /**
   * Initialisation des principaux paramètres
   * @param func
   */
  init(func=null){
    this.width_screen=window.innerWidth;

    initAvailableCameras((res)=>{
      this.webcamsAvailable=res;
    });

    this.getConfig().then(r=>{
      this.values=r;
      if(func!=null)func(this.values);
    });
  }


  /**
   * Permet de changer d'utilisateur
   * @param func
   */
  reload_user(func=null,address=""){
    if((address==null || address.length==0) && this.user != null)address=this.user.address;
    localStorage.setItem("address",address);
    if(this.user!=null){
      this.api.getuser(address).subscribe((r:any)=>{
        if(r!=null)this.user=r;
        if(func)func(r);
      });
    }
  }



  private async getConfig(): Promise<any> {
    if (!this.config) {
      this.config = (await this.http.get(this.location.prepareExternalUrl(environment.config_file)).toPromise());
    }
    return Promise.resolve(this.config);
  }

}
