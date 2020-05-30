import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  messages: Observable<Message[]>;
  rooms: Observable<Room[]>;
  users: Observable<User[]>;

  selectedUser: User;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    // this.api.getUser();
    this.rooms = this.api.roomsGet();
    this.users = this.api.usersGet();
    this.messages = this.api.messagesGet();
  }

  selectUser(user): void {
    this.api.setUser(user);
    this.selectedUser = this.api.getUser();
  }

}
