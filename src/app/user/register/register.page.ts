import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // register(form: { value: any; }) {
  //   this.authService.register(form.value).subscribe((res: any) => {
  //     this.router.navigateByUrl('home');
  //   });
  // }

}
