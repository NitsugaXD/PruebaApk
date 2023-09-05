import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  mdl_user: string = '';
  mdl_contra: string = '';
  mdlnew_contra: string = '';
  isAlertOpen = false;
  alertButtons = ['OK'];
  user:string="";
  password:string="";
  mostrarBotones: boolean = false;
  constructor(private router: Router){ 
  }

  ngOnInit(){
        let parametros = this.router.getCurrentNavigation();
        console.log(parametros?.extras.state);
        if (parametros?.extras.state) {
          this.mdl_user = parametros?.extras.state['usuario'];
          this.mdl_contra = parametros?.extras.state['pass'];
          this.mdlnew_contra=parametros?.extras.state['newpass']
        }
    };
    
  ingresar(){
    if (this.user=="" || this.password==""){
      console.log("XD")

    }
    else{
    if (this.user == this.mdl_user && (this.password == this.mdl_contra || this.password == this.mdlnew_contra)){
      let parametros: NavigationExtras = {
        state: {
          user: this.mdl_user,
          pass: this.mdl_contra,
          newpass:this.mdlnew_contra
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
        user: this.mdl_user,
        pass: this.mdl_contra,
        newpass:this.mdlnew_contra
      },
      replaceUrl:true
    }

    this.router.navigate(["restcont"],parametros)
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  registrar(){
    let parametros: NavigationExtras={
      replaceUrl:true
    }
    this.router.navigate(["registro"],parametros)
  }

}
