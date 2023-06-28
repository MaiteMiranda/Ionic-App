import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  nombreTarea = "";
  fechaHora = "";

  constructor(public router:Router, private db: BdserviceService) { }

  ngOnInit() {
  }
  
  insertar(){
    this.db.insertarTarea(this.nombreTarea,this.fechaHora);
    this.db.presentToast("Tarea Agregada");
    this.router.navigate(['/list']);
  }
}
