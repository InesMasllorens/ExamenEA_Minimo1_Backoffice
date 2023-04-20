import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ID, Ticket } from 'src/app/interfaces/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent {
 listTickets:Ticket[]=[];
 loading:boolean=false;

 constructor(private _ticketService:TicketsService, private toastr:ToastrService){

 }

 ngOnInit():void{
  this.getListTickets()
 }

 getListTickets(){
  this.loading=true;
  this._ticketService.getListTiket().subscribe((data:Ticket[])=>{
    this.listTickets=data;
    this.loading=false;
  })
 }

 deleteTicket(id: ID){
  this.loading=true;
  this._ticketService.deleteTicket(id).subscribe(()=>{
    //this.loading=false;
    this.getListTickets();
    this.toastr.warning('El ticket fue eliminado con exito','Ticket eliminado');
  });
 }

}
