import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  arrayTasks: any[] = [
    {
      id: '',
      nombre: '',
      fechaHora: ''
    }
  ]

  constructor(private router: Router, private servicioBD: BdserviceService) { }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res => {
      if (res) {
        this.servicioBD.fetchTareas().subscribe(item => {
          this.arrayTasks = item;
        })
      }
    })
  }
  
  obtenerTexto($event: any) {
    const valor = $event.target.value;
    console.log("Texto escrito: " + valor);
  }

  update(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        nombreEnviado: x.titulo,
        fechaHoraEnviada: x.texto
      }
    }

    this.router.navigate(['/update'], navigationExtras);

  }
  eliminar(x: any) { 
    this.servicioBD.eliminarTarea(x.id);
    this.servicioBD.presentToast("Tarea Eliminada");
  }
}
