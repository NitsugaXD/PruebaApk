import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: string ="";
  contrasena: string ="";
  mdlnew_contra: string="";
  constructor(private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state) {
      this.usuario = parametros?.extras.state['user'];
      this.contrasena = parametros?.extras.state['pass'];
      this.mdlnew_contra=parametros?.extras.state['newpass']
    }
  }
volver(){
  let parametros: NavigationExtras = {
    state: {
      usuario: this.usuario,
      pass: this.contrasena,
      newpass:this.mdlnew_contra
    }
}
this.router.navigate(['login'],parametros);
}
}