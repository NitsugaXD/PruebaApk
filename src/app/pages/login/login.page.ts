import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  usuario_creado: string = '';
  contrasena_creada: string = '';
  nueva_contrasena_creada: string = '';
  isAlertOpen = false;
  alertvacio = false;
  alertButtons = ['OK'];
  usuario_para_ingresar:string="";
  contrasena_para_ingresar:string="";
  constructor(private router: Router){ 
  }

  ngOnInit(){
        let parametros = this.router.getCurrentNavigation();
        console.log(parametros?.extras.state);
        if (parametros?.extras.state) {
          this.usuario_creado = parametros?.extras.state['user'];
          this.contrasena_creada = parametros?.extras.state['pass'];
          this.nueva_contrasena_creada=parametros?.extras.state['newpass']
        }
    };
    
  ingresar(){
    if (this.usuario_para_ingresar=="" || this.contrasena_para_ingresar==""){
      this.alertvacio = true;

    }
    else{
    if (this.usuario_para_ingresar == this.usuario_creado && (this.contrasena_para_ingresar == this.contrasena_creada || this.contrasena_para_ingresar == this.nueva_contrasena_creada)){
      let parametros: NavigationExtras = {
        state: {
          user: this.usuario_creado,
          pass: this.contrasena_creada,
          newpass:this.nueva_contrasena_creada
        },
        replaceUrl:true
      }
      this.router.navigate(['principal'], parametros);
    }
    else {
      this.isAlertOpen = true;
    }
  }}
  restablecer(){
    let parametros: NavigationExtras = {
      state: {
        user:   this.usuario_creado,
        pass:   this.contrasena_creada,
        newpass:this.nueva_contrasena_creada
      },
      replaceUrl:true
    }

    this.router.navigate(["restcont"],parametros)
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  alertavacia(abierto: boolean) {
    this.alertvacio = abierto;
  }
  registrar(){
    let parametros: NavigationExtras={
      replaceUrl:true
    }
    this.router.navigate(["registro"],parametros)
  }

}
