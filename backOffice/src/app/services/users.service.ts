import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ID, User } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;

    
  }

  getListUsers(): Observable<User[]> {
    const myApiUrl: string = 'user/all'
    return this.http.get<User[]>(`${this.myAppUrl}${myApiUrl}`)
  }

  deleteUser(id: ID): Observable<void> {
    const myApiUrl: string = 'user/'
    return this.http.delete<void>(`${this.myAppUrl}${myApiUrl}${id}`)

  }

  crateUser(user: User): Observable<User> {
    const myApiUrl: string = 'user/'
    return this.http.post<User>(`${this.myAppUrl}${myApiUrl}`, user);
  }

  getUser(id: string): Observable<User> {
    const myApiUrl: string = 'user/';
    return this.http.get<User>(`${this.myAppUrl}${myApiUrl}${id}`);
  }

  updateUser(id: string, user: User): Observable<User> {
    const myApiUrl: string = 'user/';
    return this.http.put<User>(`${this.myAppUrl}${myApiUrl}${id}`, user);
  }


}