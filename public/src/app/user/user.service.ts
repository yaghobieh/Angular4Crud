import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import 'rxjs/add/operator/map'
import "rxjs";
import  { Observable } from "rxjs";

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  // create new user
  create(user: User) {
    return this._http.post("/users", user).map(data=> data.json()).toPromise()
  }

  // Delete user
  destroy(user: User){
    return this._http.delete("/users/" +user._id).map(data=> data.json()).toPromise()
  }

  // update user
  update(user: User){
    return this._http.put("/users/" +user._id, user).map(data=> data.json()).toPromise()
  }

  // Get all users
  getUsers(){
    return this._http.get("/users/").map(data=> data.json()).toPromise()
  }

  // Get single user
  getUser(user: User){
    return this._http.get("/users/" +user._id).map(data=> data.json()).toPromise()
  }
}
