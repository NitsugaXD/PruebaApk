import { Component } from '@angular/core';
import { DbService } from 'src/app/services/db.service'; 
import { NavigationExtras, Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage {
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';

  constructor(private dbService: DbService, private router: Router, private alertController: AlertController,private apiService: ApiService) { }

  async registrarUsuario() {
    if (this.usuario === "" || this.nombre === "" || this.apellido === "" || this.correo===""|| this.contrasena==="") {
      const alert = await this.alertController.create({
        header: 'Error en el registro',
        message: 'Existen campos vacios',
        buttons: ['OK']
      });
      await alert.present();
    }
    else {
      try {
        this.apiService.personaAlmacenar(this.usuario,this.correo, this.contrasena, this.nombre,this.apellido).subscribe(
          async (response: any) => {
            if (response.result[0].RESPUESTA === 'OK') {
              this.dbService.almacenarPersona(this.usuario, this.nombre, this.apellido, this.correo, this.contrasena);
              const alert = await this.alertController.create({
                header: 'Exito',
                message: 'Datos guardados correctamente',
                buttons: ['OK']
              });
              await alert.present();
              this.router.navigate(['login'], {replaceUrl:true});
            } else if (response.result[0].RESPUESTA === 'ERR01') {
              const alert = await this.alertController.create({
                header: 'Error en el registro',
                message: 'El usuario ya existe. Intente nuevamente',
                buttons: ['OK']
              });
              await alert.present();
            } else if (response.result[0].RESPUESTA === 'ERR02') {
              const alert = await this.alertController.create({
                header: 'Error en el registro',
                message: 'El correo esta en uso. Intente nuevamente',
                buttons: ['OK']
              });
              await alert.present();
            } else {
              const alert = await this.alertController.create({
                header: 'Error en el registro',
                message: 'Hubo un problema al registrar al usuario. Por favor, inténtalo de nuevo.',
                buttons: ['OK']
              });
              await alert.present();
            }
          },
          (error) => {
            alert(error);})
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Error en el registro',
          message: 'Hubo un problema al registrar al usuario. Por favor, inténtalo de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }
  volver(){
    this.router.navigate(['login'],{replaceUrl: true});
  }
}


