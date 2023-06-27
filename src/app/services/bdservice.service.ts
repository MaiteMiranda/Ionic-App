import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  
  public database!: SQLiteObject;

  tablaTareas: string = "CREATE TABLE IF NOT EXISTS tarea(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, fecha DATE, hora TIME);";

  registroTarea: string = "INSERT OR IGNORE INTO tarea(id, nombre, fecha, hora) VALUES(1, 'tarea programacion', 10/10/2023, 10:20);";

  listaTareas = new BehaviorSubject([]);
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) { 
    this.baseDatosTarea();
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchTareas(): Observable<Tarea[]> {
    return this.listaTareas.asObservable();
  }

  baseDatosTarea() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bdTareas.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexion a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error BD:" + e);
      })
    })
  }

  async crearTablas() {
    try {
      //ejecuto mis tablas
      await this.database.executeSql(this.tablaTareas, []);
      //ejecuto mis registros
      await this.database.executeSql(this.registroTarea, []);
      //cargar todos los registros de la tabla en el observable
      this.buscarTarea();
      //actualizar el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }

  }

  buscarTarea() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM tarea', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Tarea[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaTareas.next(items as any);
    })
  }

  insertarTarea(nombre: any){
    let data = [nombre];
    return this.database.executeSql('INSERT INTO tarea(nombre) VALUES (?,?)',data).then(res=>{
      this.buscarTarea();
    });

  }

  modificarTarea(id: any,nombre: any){
    let data = [nombre, id];
    return this.database.executeSql('UPDATE tarea SET nombre = ? WHERE id = ?',data).then(data2=>{
      this.buscarTarea();
    })
  }

  eliminarTarea(id: any){
    return this.database.executeSql('DELETE FROM tarea WHERE id = ?',[id]).then(a=>{
      this.buscarTarea();
    })

  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

