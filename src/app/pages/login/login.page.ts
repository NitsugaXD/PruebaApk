import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  mdl_user: string = '';
  mdl_contra: string = '';
  colored: string = "danger";
  colorgre: string="success";
  isAlertOpen = false;
  alertButtons = ['OK'];
  user:string="";
  password:string="";
  constructor(private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state) {
      this.mdl_user = parametros?.extras.state['usuario'];
      this.mdl_contra = parametros?.extras.state['pass'];
    }
  }
  ingresar(){
    if(this.user == this.mdl_user && this.password == this.mdl_contra){
      
      let parametros: NavigationExtras = {
        state: {
          user: this.mdl_user,
          pass: this.mdl_contra
        }
      }
      this.router.navigate(['principal'], parametros);
    } else {
      this.isAlertOpen = true;
    }
  }
  restablecer(){
    let parametros: NavigationExtras = {
      state: {
        user: this.mdl_user,
        pass: this.mdl_contra
      }
    }
    this.router.navigate(["restcont"],parametros)
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  registrar(){
    this.router.navigate(["registro"])
  }

}
