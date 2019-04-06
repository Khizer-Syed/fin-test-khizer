import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface User {
  _id: string,
  name: string,
  age: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users: User[] = [];
  tableColumns: string[] = ['ID', 'NAME', 'AGE'];
  addUserForm: FormGroup;
  editUserForm: FormGroup;
  showForm: boolean = false;
  editForm:boolean = false;
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
    this.addUserForm = this.fb.group({
      name: '',
      age: ''
    });
    this.showForm = true;
    
  }

 

  editUser(id: string, index:number) {
    let user = this.users[index];

    // Need to save user._id here as it wont be accessible when we submit
    // the edit user form later and update the user 
    // because we will disable this field to make it uneditable
    this.editUserId = user._id;
    this.editUserForm = this.fb.group({
      id: this.fb.control({value: user._id, disabled: true}),
      name: user.name,
      age: user.age
    })
    this.editForm = true;

  }

  deleteUser(id:string) {
    this._dataService.deleteUser(id).subscribe(() => {
      this.refresh();
    });
  }

  addUser() {
    this._dataService.addUser({name: this.addUserForm.value.name, age: this.addUserForm.value.age}).subscribe(() => {
      this.showForm = false;
      this.refresh();
    })
  }

  updateUser() {    
    this._dataService.updateUser(this.editUserId, {
      name:this.editUserForm.value.name, 
      age: this.editUserForm.value.age
    }).subscribe(() => {
      this.editForm = false;
      this.editUserId = '';
      this.refresh();
    })
  }
}
