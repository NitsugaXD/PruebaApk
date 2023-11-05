import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS PERSONA(USUARIO VARCHAR(30), NOMBRE VARCHAR(20), APELLIDO VARCHAR(20), CORREO VARCHAR(50), CONTRASENA VARCHAR(30))', [])
          .then(() => console.log('FSR: TABLA CREADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS SESION(USUARIO VARCHAR(30),CONTRASENA VARCHAR(30))', [])
          .then(() => console.log('FSR: TABLA CREADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  almacenarPersona(usuario: string, nombre: string, apellido: string, correo: string, contrasena: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO PERSONA (USUARIO, NOMBRE, APELLIDO, CORREO, CONTRASENA) VALUES (?, ?, ?, ?, ?)', [usuario, nombre, apellido, correo, contrasena])
          .then(() => console.log('FSR: PERSONA ALMACENADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }
  almacenarSesion(usuario: string, contrasena: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO SESION (USUARIO, CONTRASENA) VALUES (?, ?)', [usuario, contrasena])
          .then(() => console.log('FSR: PERSONA ALMACENADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }
  verificarSesion(){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT COUNT(USUARIO) as cantidad FROM SESION', [])
          .then((data) => {
            return data.rows.item(0).cantidad;
          })
          .catch(e => {
            console.log('Error al encontrar la persona: ' + JSON.stringify(e));
          });
      })
      .catch(e => {
        console.log('Error al abrir la base de datos: ' + JSON.stringify(e));
      });
  }
  cerrarSesion(usuario: string,contrasena:string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM SESION WHERE USUARIO = ? AND CONTRASENA = ?', [usuario,contrasena])
          .then(() => console.log('FSR: PERSONA ALMACENADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }
  restablecerContrasena(usuario: string, contrasenavieja: string, contrasenanueva: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE PERSONA SET CONTRASENA = ? WHERE USUARIO = ? AND CONTRASENA = ?', [contrasenanueva, usuario, contrasenavieja])
          .then(() => {
            console.log('Contraseña actualizada con éxito');
          })
          .catch(e => {
            console.log('Error al actualizar la contraseña: ' + JSON.stringify(e));
          });
      })
      .catch(e => {
        console.log('Error al abrir la base de datos: ' + JSON.stringify(e));
      });
  }
  InicioDeSesion(usuario: string, contrasena: string) {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT COUNT(USUARIO) as cantidad FROM PERSONA WHERE USUARIO = ? AND CONTRASENA = ?', [usuario, contrasena])
          .then((data) => {
            return data.rows.item(0).cantidad;
          })
          .catch(e => {
            console.log('Error al encontrar la persona: ' + JSON.stringify(e));
          });
      })
      .catch(e => {
        console.log('Error al abrir la base de datos: ' + JSON.stringify(e));
      });
  }
  obtenerInformacionPersona(usuario: string, contrasena: string) {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT NOMBRE, APELLIDO, CORREO FROM PERSONA WHERE USUARIO = ? AND CONTRASENA = ?', [usuario, contrasena])
          .then((data) => {
            let objeto: any = {};
            objeto.nombre = data.rows.item(0).NOMBRE
            objeto.apellido = data.rows.item(0).APELLIDO
            objeto.correo = data.rows.item(0).CORREO
            return objeto
          })
          .catch(e => {
            console.log('Error al actualizar la contraseña: ' + JSON.stringify(e));
          });
      })
      .catch(e => {
        console.log('Error al abrir la base de datos: ' + JSON.stringify(e));
      });
  }
  obtenerSesion() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT USUARIO,CONTRASENA FROM SESION', [])
          .then((data) => {
            let objeto: any = {};
            objeto.usuario = data.rows.item(0).USUARIO
            objeto.contrasena = data.rows.item(0).CONTRASENA
            return objeto
          })
          .catch(e => {
            console.log('Error al actualizar la contraseña: ' + JSON.stringify(e));
          });
      })
      .catch(e => {
        console.log('Error al abrir la base de datos: ' + JSON.stringify(e));
      });
  }
}