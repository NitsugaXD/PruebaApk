import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-restcont',
  templateUrl: './restcont.page.html',
  styleUrls: ['./restcont.page.scss'],
})
export class RestcontPage implements OnInit {
recargar: boolean = true;
usuario:string="";
contrasena:string="";
user:string="";
pass:string="";
newpass:string="";
isAlertOpen = false;
alertButtons = ['OK'];

  constructor(private router: Router, private navCtrl: NavController) { }
  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state) {
      this.user = parametros?.extras.state['user'];
      this.pass = parametros?.extras.state['pass'];
    }
  }
  confirmar(){
    if(this.usuario==""||this.contrasena==""){
      console.log("XD")
    }
    else{
      if (this.usuario == this.user){
        this.pass=this.contrasena
        let parametros: NavigationExtras= {
          state: {
            usuario: this.user,
            newpass: this.contrasena
          },
            replaceUrl:true
          
        }
        this.router.navigate(['login'],parametros)  
      }
      else{
        this.isAlertOpen = true;
      }
    }

  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  volver(){
    let parametros: NavigationExtras = {
      state: {
        usuario: this.usuario,
        pass: this.contrasena,
        newpass:this.newpass
      },
      replaceUrl:true
  }
  this.router.navigate(['login'],parametros);
  }
}