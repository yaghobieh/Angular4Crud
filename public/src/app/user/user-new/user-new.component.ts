import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from './../user';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  newUser = new User();
  //For output this new user to other section
  @Output() createNewUserEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  create() {
    //call server to save
    this.createNewUserEvent.emit(this.newUser);
    //Clear user
    this.newUser = new User();
  }

}
