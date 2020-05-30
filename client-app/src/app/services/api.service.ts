import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { Room } from '../models/room.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:30000/api/'
  private user: User;
  constructor(private http: HttpClient) { 
    const lsUser = localStorage.getItem('user');
    if (lsUser) {
      this.user = JSON.parse(lsUser);
    }
  }

  // ROOMS
  roomsGet(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl + 'rooms/');
  }
  roomsPost(room: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl + 'rooms/', room);
  }
  roomsPut(room: Room): Observable<Room> {
    return this.http.put<Room>(this.baseUrl + 'rooms/' + room._id, room);
  }
  roomsDelete(room: Room): Observable<Room> {
    return this.http.delete<Room>(this.baseUrl + 'rooms/' + room._id);
  }

  // USERS
  usersGet(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }
  usersPost(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.baseUrl + 'users/', user);
  }
  usersPut(user: User): Observable<User[]> {
    return this.http.put<User[]>(this.baseUrl + 'users/' + user._id, user);
  }
  usersDelete(user: User): Observable<User[]> {
    return this.http.delete<User[]>(this.baseUrl + 'users/' + user._id);
  }

  // MESSAGES
  messagesGet(path?: string): Observable<Message[]> {
    let url = this.baseUrl + 'messages/';
    if (path) {
      url += '?roomPath=' + path;
    }
    return this.http.get<Message[]>(url);
  }


  // User State
  setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  getUser(): User {
    return this.user;
  }

}
