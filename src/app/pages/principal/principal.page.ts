import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: string ="";
  newpass: string ="";
  contrasena: string ="";
  constructor(private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state) {
      this.usuario = parametros?.extras.state['user'];
      this.contrasena = parametros?.extras.state['pass'];
      this.newpass=parametros?.extras.state['newpass']
    }
  }
volver(){
  let parametros: NavigationExtras = {
    state: {
      usuario: this.usuario,
      pass: this.contrasena,
      newpass: this.newpass
    },replaceUrl:true
}
this.router.navigate(['login'],parametros);
}
}