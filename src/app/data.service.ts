import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user.model';

@Injectable()
export class DataService {
    apiUrl: string = 'http://localhost:3002/api/user';
    constructor(private _http: HttpClient) {}
    getUsers () {
        return this._http.get<User[]>(this.apiUrl);
    }

    deleteUser(id) {
        return this._http.delete(this.apiUrl + '/' + id);
    }

    addUser(user: User) {
        return this._http.post(this.apiUrl, user)
    }

    updateUser(id, user: User) {
        return this._http.patch(this.apiUrl + '/' + id, user);
    }
}