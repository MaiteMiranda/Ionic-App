import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Tarea } from './tarea';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  public database!: SQLiteObject;

  tablaTareas: string = "CREATE TABLE IF NOT EXISTS tarea (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, fechaHora DATETIME);";
  registroTarea: string = "INSERT OR IGNORE INTO tarea(id, nombre, fechaHora) VALUES(1, 'tarea programacion', '10-10-2023 10:20')";

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
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bdTareas.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch(e => {
        this.presentToast("Error BD:" + e);
      })
    })
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaTareas, []);
      await this.database.executeSql(this.registroTarea, []);
      this.buscarTarea();
      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }
  }

  async buscarTarea() {
    const res = await this.database.executeSql('SELECT * FROM tarea', []);
    let items: Tarea[] = [];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id: res.rows.item(i).id,
          nombre: res.rows.item(i).nombre,
          fechaHora: res.rows.item(i).fechaHora,
        });
      }
    }
    this.listaTareas.next(items as any);
  }

  async insertarTarea(nombre: any, fechaHora: any){
    let data = [nombre, fechaHora];
    const resultado = await this.database.executeSql('INSERT INTO tarea(nombre, fechaHora) VALUES (?,?)', data);
    this.buscarTarea();
  }

  async modificarTarea(id: any, nombre: any, fechaHora: any){
    let data = [nombre, fechaHora, id];
    const data2 = await this.database.executeSql('UPDATE tarea SET nombre = ?, fechaHora = ? WHERE id = ?', data);
    this.buscarTarea();
  }
  async eliminarTarea(id: any){
    const a = await this.database.executeSql('DELETE FROM tarea WHERE id = ?', [id]);
    this.buscarTarea();
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

