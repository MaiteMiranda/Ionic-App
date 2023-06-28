import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  users:any;
  user:any;
  constructor(private api: ApiserviceService) { }


  ngOnInit() {
  }
  getUsuarios(){
    this.api.getUsuarios().subscribe((data)=>{
      this.users = data;
    });
  }
  ionViewWillEnter(){
    this.getUsuarios();
  }

}
