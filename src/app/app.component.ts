import {Component, OnInit} from '@angular/core';
import {ConfigService} from './config.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PromptComponent} from './prompt/prompt.component';
import {ApiService} from './api.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketShare';

  constructor(public config: ConfigService, public dialog: MatDialog, public api: ApiService,public toast:MatSnackBar,public _location: Location) {
    config.init();
    this.initUser();
  }

  initUser() {
    const address = localStorage.getItem('address');
    if (!address) {
      this.dialog.open(PromptComponent, {width: '250px',
        data: {
          title: 'Email ou addresse de compte',
          question: 'Indiquer votre email ou l\'adresse de votre compte pour acheter des billets',
          onlyConfirm: false,
          canEmoji: false
        }
      }).afterClosed().subscribe((result) => {
        if(result==null){
          this._location.go("cgu.html");
        }
          
        this.api.adduser(result).subscribe((r: any) => {
          this.config.user = r;
          localStorage.setItem('address', r._id);
        },(err)=>{
          this.toast.open("Adresse incorrecte");
          this.initUser();
        });
      });
    } else {
      this.api.getuser(address).subscribe((r: any) => {
        if(r.status==500){
          localStorage.removeItem("address");
          this.initUser();
        }else{
          this.config.user = r;
        }
      });
    }
  }

  ngOnInit(): void {

  }
}
