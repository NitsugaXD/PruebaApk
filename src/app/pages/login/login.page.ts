import { Component } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';
  constructor(private dbService: DbService, private router: Router, private alertController: AlertController, private apiService: ApiService) { }

  ngOnInit() {
  }
  async inicioSesion() {
    if (this.usuario == "" && this.contrasena == "") {
      const alert = await this.alertController.create({
        header: 'Error en el inicio de sesion',
        message: 'Campos vacios',
        buttons: ['OK']
      });
      await alert.present();
    } else
      this.apiService.personalogin(this.usuario, this.contrasena).subscribe(
        async (response: any) => {
          if (response.result[0].RESPUESTA === 'LOGIN OK') {
            this.dbService.InicioDeSesion(this.usuario, this.contrasena).then(async data => {
              if (data == 1) {
                let parametros: NavigationExtras = {
                  state: {
                    usuario: this.usuario,
                    contrasena: this.contrasena,
                  }, replaceUrl: true
                }
                this.dbService.almacenarSesion(this.usuario, this.contrasena)
                this.router.navigate(['principal'], parametros)
              }
              else {
                const alert = await this.alertController.create({
                  header: 'Error en el inicio de sesion',
                  message: 'Usuario o Contrasena incorrectos',
                  buttons: ['OK']
                });
                await alert.present();
              }
            })
          } else {
            const alert = await this.alertController.create({
              header: 'Error en el inicio de sesion',
              message: 'Usuario o Contrasena incorrectos',
              buttons: ['OK']
            });
            await alert.present();
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
  }
  registrar() {
    this.router.navigate(['registro'], { replaceUrl: true });
  }
}
