import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  idTarea = "";
  nombreTarea = "";
  fechaHora =  "";
  
  constructor(private router: Router, private activedRouter: ActivatedRoute, private servicio: BdserviceService) { 
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idTarea = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.nombreTarea = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
        this.fechaHora = this.router.getCurrentNavigation()?.extras?.state?.['fechaHoraEnviada'];
      }
    })
  }

  ngOnInit() {
  }

  editar(){
    this.servicio.modificarTarea(this.idTarea,this.nombreTarea,this.fechaHora);
    this.servicio.presentToast("Tarea Actualizada");
    this.router.navigate(['/list']);
  }
}
