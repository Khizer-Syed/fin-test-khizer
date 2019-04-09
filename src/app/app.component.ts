import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  editMode: boolean = false;
  userForm: FormGroup;
  showForm: boolean = false;
  editUserId: string = '';

  constructor(private _dataService: DataService,
    private fb: FormBuilder) {

  }


  ngOnInit() {
    this.refresh();

  }

  refresh() {
    this._dataService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  showAddUserForm() {
    this.userForm = this.fb.group({
      name: '',
      age: ''
    });
    this.showForm = true;
  }

  deleteUser(id: string) {
    this._dataService.deleteUser(id).subscribe(() => {
      this.refresh();
    });
  }

  addOrEditUser() {
    this.editMode ? this.updateUser() : this.addUser();
  }

  addUser() {
    let user = new User(this.userForm.value.name, this.userForm.value.age);
    this._dataService.addUser(user).subscribe(() => {
      this.showForm = false;
      this.refresh();
    })
  }

  editUser(id: string, index: number) {
    let user = _.clone(this.users[index]);

    this.editUserId = user._id;
    this.userForm = this.fb.group({
      id: this.fb.control({ value: user._id, disabled: true }),
      name: user.name,
      age: user.age
    });

    this.editMode = true;
    this.showForm = true;
  }

  updateUser() {
    this._dataService.updateUser(this.editUserId,
      new User(this.userForm.value.name, this.userForm.value.age))
      .subscribe(() => {
        this.editMode = false;
        this.showForm = false;
        this.editUserId = '';
        this.refresh();
      })
  }
}
