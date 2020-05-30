import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { tap, catchError, map, first } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Room } from './models/room.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client-app';

  rooms: Observable<Room[]>;
  newRoomName: string = '';

  constructor(private api: ApiService) {
  }


  ngOnInit(): void {
    this.rooms = this.getRooms();
  }

  createRoom(newRoomName: string): void {
    const room = new Room(newRoomName);
    this.api.roomsPost(room).pipe(first()).subscribe((newRoom) => {
      this.rooms = this.getRooms();
    });
  }

  getRooms(): Observable<Room[]> {
    return this.api.roomsGet();
  }

}
