import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string | null = null;
  color: string = 'light';

  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  changeColor() {
    this.color = this.color === 'light' ? 'dark' : 'light';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
