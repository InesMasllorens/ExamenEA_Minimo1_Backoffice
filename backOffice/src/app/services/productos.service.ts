import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ID, Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;

    
  }

  getProductosTicket(id: string) {
    const myApiUrl: string = `ticket/${id}/productos`;
    return this.http.get<Producto[]>(`${this.myAppUrl}${myApiUrl}`)
  }

  getListProductos(): Observable<Producto[]> {
    const myApiUrl: string = 'producto/all'
    return this.http.get<Producto[]>(`${this.myAppUrl}${myApiUrl}`)
  }

  deleteProducto(id: ID): Observable<void> {
    const myApiUrl: string = 'producto/'
    return this.http.delete<void>(`${this.myAppUrl}${myApiUrl}${id}`)

  }

  crateProducto(producto: Producto): Observable<Producto> {
    const myApiUrl: string = 'producto/'
    return this.http.post<Producto>(`${this.myAppUrl}${myApiUrl}`, producto);
  }

  getProducto(id: string): Observable<Producto> {
    const myApiUrl: string = 'producto/';
    return this.http.get<Producto>(`${this.myAppUrl}${myApiUrl}${id}`);
  }

  updateProducto(id: string, product: Producto): Observable<Producto> {
    const myApiUrl: string = 'producto/';
    return this.http.put<Producto>(`${this.myAppUrl}${myApiUrl}${id}`, product);
  }

  insertProductoToTicket(idTicket: string, idProducto: string): Observable<Ticket> {
    const myApiUrl: string = 'ticket/insert'
    return this.http.post<Ticket>(`${this.myAppUrl}${myApiUrl}`,{
      "idTicket":`${idTicket}`,
      "idProducto":`${idProducto}`
  });
  }
}
