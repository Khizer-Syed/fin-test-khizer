import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { NgForm } from '@angular/forms';
import { User } from './model/user.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users: User[] = [];
  tableColumns: string[] = ['ID', 'NAME', 'AGE'];
  editMode = false;
  showForm = false;
  selectedUser: User;

  constructor(private dataService: DataService) {

  }


  ngOnInit() {
    this.refresh();

  }

  refresh() {
    this.dataService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  showUserForm() {
    this.selectedUser = new User('', undefined);
    this.showForm = true;
  }
  save(form: NgForm) {
    if (this.editMode) {
      this.updateUser();
    } else {
      this.addUser(form);
    }
  }

  deleteUser(id) {
    this.dataService.deleteUser(id).subscribe(() => {
      this.refresh();
    });
  }

  addUser(form: NgForm) {
    this.selectedUser = new User(form.value.name, form.value.age);
    this.dataService.addUser(this.selectedUser).subscribe(() => {
      this.showForm = false;
      this.refresh();
    });
  }

  editUser(user: User) {
    this.selectedUser = _.cloneDeep(user);
    this.editMode = true;
    this.showForm = true;
  }
  updateUser() {

    this.dataService.updateUser(this.selectedUser._id, _.omit(this.selectedUser, '_id'))
      .subscribe(() => {
        this.editMode = false;
        this.showForm = false;
        this.refresh();
      });
  }
}
