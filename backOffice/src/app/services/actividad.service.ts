import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ID, Actividad } from '../interfaces/actividad';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;

    
  }

  getListActividades(): Observable<Actividad[]> {
    const myApiUrl: string = 'actividad/all'
    return this.http.get<Actividad[]>(`${this.myAppUrl}${myApiUrl}`)
  }

  deleteActividad(id: ID): Observable<void> {
    const myApiUrl: string = 'actividad/'
    return this.http.delete<void>(`${this.myAppUrl}${myApiUrl}${id}`)

  }

  createActividad(actividad: Actividad): Observable<Actividad> {
    const myApiUrl: string = 'actividad/'
    return this.http.post<Actividad>(`${this.myAppUrl}${myApiUrl}`, actividad);
  }

  getActividad(id: string): Observable<Actividad> {
    const myApiUrl: string = 'actividad/';
    return this.http.get<Actividad>(`${this.myAppUrl}${myApiUrl}${id}`);
  }

  updateActividad(id: string, actividad: Actividad): Observable<Actividad> {
    const myApiUrl: string = 'actividad/';
    return this.http.put<Actividad>(`${this.myAppUrl}${myApiUrl}${id}`, actividad);
  }

  getActividadUser(id: string) {
    const myApiUrl: string = `user/${id}/actividad`;
    return this.http.get<Actividad[]>(`${this.myAppUrl}${myApiUrl}`)
  }

  insertActividadToUser(idUser: string, idActividad: string): Observable<User> {
    const myApiUrl: string = 'user/insert'
    return this.http.post<User>(`${this.myAppUrl}${myApiUrl}`,{
      "idUser":`${idUser}`,
      "idActividad":`${idActividad}`
  });
  }

}