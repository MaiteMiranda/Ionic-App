import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = '';
  email: string = '';
  pass1: string = '';
  pass2: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  register() {
    if (this.name && this.email && this.pass1 && this.pass2) {
      this.router.navigate(['/home', this.name]);
    }
  }
}
