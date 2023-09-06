import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private router: Router) { }
  user:string="";
  con:string="";
  alertvacio = false;
  alertButtons = ['OK'];
  ngOnInit() {
  }
  registrar(){
    if(this.user=="" || this.con==""){
      this.alertvacio = true;
    }
    else{
      let parametros: NavigationExtras = {
        state: {
          usuario: this.user,
          pass: this.con
        }
        ,replaceUrl:true
      }
      this.router.navigate(['login'],parametros);
    }
  }
  alertavacia(abierto: boolean) {
    this.alertvacio = abierto;
  }
}
