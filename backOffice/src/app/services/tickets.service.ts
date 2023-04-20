import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ID, Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private myAppUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl=environment.endpoint+"ticket/";
    
   }

   getListTiket():Observable<Ticket[]>{
    const myApiUrl:string='all'
    return this.http.get<Ticket[]>(`${this.myAppUrl}${myApiUrl}`)
   }

   deleteTicket(id:ID):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${id}`)
    
   }

   crateTicket(ticket:Ticket):Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}`,ticket);
   }

   getTicket(id:string):Observable<Ticket>{
    return this.http.get<Ticket>(`${this.myAppUrl}${id}`);
   }

   updateTicket(id:string,ticket:Ticket):Observable<Ticket>{
    return this.http.put<Ticket>(`${this.myAppUrl}${id}`,ticket);
   }
}
