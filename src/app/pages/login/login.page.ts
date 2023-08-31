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
  constructor(private router: Router) { }

  ngOnInit() {
  }
  ingresar(){
    if(this.mdl_user == 'Agustin' && this.mdl_contra == 'agustin2004'){
      
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
    this.router.navigate(["restcont"])
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
