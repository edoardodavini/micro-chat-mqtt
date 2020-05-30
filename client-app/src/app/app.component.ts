import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Room } from './models/room.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client-app';

  rooms: Observable<Room[]>;
  room: Observable<Room>;

  newRoomName: string = '';

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.rooms = this.getRooms();
    // this.room = this.route.paramMap.pipe(
      // switchMap((params: ParamMap) => {
      //   return this.api.roomsGetByPath(params.get('path'))
      // })
    // )
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
