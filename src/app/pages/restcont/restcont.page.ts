import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-restcont',
  templateUrl: './restcont.page.html',
  styleUrls: ['./restcont.page.scss'],
})
export class RestcontPage implements OnInit {
usuario:string="";
contrasena:string="";
user:string="";
pass:string="";

  constructor(private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state) {
      this.user = parametros?.extras.state['user'];
      this.pass = parametros?.extras.state['pass'];
    }
  }
  confirmar(){
    if (this.usuario == this.user){
      this.pass=this.contrasena
      let parametros: NavigationExtras= {
        state: {
          user: this.mdl_user,
        }
      }
    }
    else{

    }
  }

}
