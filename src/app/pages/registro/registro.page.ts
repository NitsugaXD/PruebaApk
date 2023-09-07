import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private router: Router) { }
  nuevo_usuario:string="";
  nueva_contrasena:string="";
  alertvacio = false;
  alertButtons = ['OK'];
  ngOnInit() {
  }
  registrar(){
    if(this.nuevo_usuario=="" || this.nueva_contrasena==""){
      this.alertvacio = true;
    }
    else{
      let parametros: NavigationExtras = {
        state: {
          user: this.nuevo_usuario,
          pass: this.nueva_contrasena
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
