import { UserService } from './user.service'
import { Component, OnInit } from '@angular/core';
import { User } from './user'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users : Array<User> = [
    // new User(1, "First", "Lest", "email@tmail.com"),
    // new User(2, "First", "Lest", "email@tmail.com"),
    // new User(3, "First", "Lest", "email@tmail.com"),
  ];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    // this.getUser();
  }

  create(user: User) {
    this._userService.create(user)
    .then(user => this.getUser())
    .catch(err => console.log(err));
  }

  destroy(user: User) {
    console.log(user);
    this._userService.destroy(user)
    .then(user => this.getUser())
    .catch(err => console.log(err));
  }

  update(user: any){
    this._userService.update(user)
    .then(user => this.getUser())
    .catch(err => console.log(err));
  }

  getUser(){
    this._userService.getUsers()
    .then(users => this.users = users)
    .catch(err => console.log(err));
  }

}
