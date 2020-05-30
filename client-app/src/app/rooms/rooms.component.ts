import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Room } from '../models/room.model';
import { Observable, combineLatest, merge, of, zip, from } from 'rxjs';
import { tap, catchError, map, switchMap, startWith, filter, first, take } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { User } from '../models/user.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {
  rooms: Observable<Room>;
  messages: Observable<Message[]>;

  newRoomName: string = ''; // todo: I don't like this
  roomPath: string;
  message: Message;
  status: Array<string> = [];

  // users map support for coolness
  users = {};

  constructor(private api: ApiService, private mqttService: MqttService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.message = new Message();

    this.route.snapshot.paramMap.get('path');

    this.messages = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.openRoom(params.get('path'))
      })
    );
  }

  openRoom(path: string): Observable<Message[]> {
    this.roomPath = path;
    let emptyMessage: IMqttMessage;
    return combineLatest(
      this.api.messagesGet(path).pipe(map((messages: Array<Message>) => {
        messages.map(msg => {
          if (msg.user && !this.users[msg.user._id]) {
            this.users[msg.user._id] = msg.user;
          }
        });
        return messages;
      })),
      this.mqttService.observe('room/' + path).pipe(startWith(emptyMessage))
    ).pipe(
      map(
        ([oldMessages, message]: [Array<Message>, IMqttMessage]): Array<Message> => {
          if (!message) {
            return oldMessages;
          } else {
            oldMessages.push(this.buildMessageFromMQTT(message.payload));
            return oldMessages;
          }
        }
      ),
      catchError((err) => {
        console.warn(err);
        return this.api.messagesGet();
      })
    );
  }

  buildMessageFromMQTT(payload): Message {
    const msg = JSON.parse(payload.toString());
    let message = new Message();
    message.user = new User();
    message.user = this.users[msg.user];
    message.message = msg.message;
    message.date = new Date();
    return message;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.submit()
    }
  }

  submit() {
    const mqttMessage = {
      message: this.message.message,
      user: this.api.getUser()._id
    }
    this.mqttService.unsafePublish('room/' + this.roomPath, JSON.stringify(mqttMessage));
    this.message.message = '';
  }


  ngOnDestroy() {
    // maybe nothing to do
  }
}
