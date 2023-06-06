import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: { name: string; date: string; }[] = [];
  newTask: string = '';
  newDate: string = '';
  constructor( private router: Router) {}

  ngOnInit() {
  }
 
  addTask() {
    if (this.newTask && this.newDate) {
      const task = {
        name: this.newTask,
        date: this.newDate
      };
      this.tasks.push(task);
      this.newTask = '';
      this.newDate = '';
    }
  }
  
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
  
  logout() {
    this.router.navigate(['/login']);
  }


}
