import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://fer-sepulveda.cl/API_PRUEBA_2/api-service.php';

  constructor(private http: HttpClient) { }


  personaAlmacenar(usuario: string, correo: string, contrasena: string, nombre: string, apellido: string) {
    return this.http.post(this.apiUrl, {
      nombreFuncion: 'UsuarioAlmacenar',
      parametros: [usuario, correo, contrasena, nombre, apellido]
    }).pipe();
  }

  personalogin(usuario: string, contrasena: string) {
    return this.http.post(this.apiUrl, {
      nombreFuncion: 'UsuarioLogin',
      parametros: [usuario, contrasena]
    }).pipe();
  }

  personaModificarContrasena(usuario: string, contrasenaNueva: string, contrasenaActual: string) {
    return this.http.patch(this.apiUrl, {
      nombreFuncion: 'UsuarioModificarContrasena',
      parametros: [usuario, contrasenaNueva, contrasenaActual]
    }).pipe();
  }
}