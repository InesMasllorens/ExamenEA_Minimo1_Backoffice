import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID, Ticket } from 'src/app/interfaces/ticket';
import { ListTicketsComponent } from '../list-tickets/list-tickets.component';
import { TicketsService } from 'src/app/services/tickets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-tickets.component.html',
  styleUrls: ['./add-edit-tickets.component.css']
})
export class AddEditTicketComponent {
  formTicket: FormGroup;
  loading: boolean = false;
  idTicket: string;
  operacion: string = 'Añadir ';

  constructor(private fb: FormBuilder,
    private _ticketService: TicketsService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _location: Location) {
    this.formTicket = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      nombre: ['', Validators.required],
      location: [null, Validators.required],
    })
    this.idTicket = aRouter.snapshot.paramMap.get("idTicket")!;
  }
  ngOnInit(): void {
    if (this.idTicket != null) {
      this.operacion = 'Actualizar ';
      this.getTicket(this.idTicket);
    }
  }

  goBack(){
    this._location.back();
  }


  addTicket() {
    const ticket: Ticket = {
      nombre: this.formTicket.value.nombre,
      productos: this.formTicket.value.productos,
      location: this.formTicket.value.location,

    }

    this.loading = true;
    if (this.idTicket !== null) {
      //Es update
      this._ticketService.updateTicket(this.idTicket, ticket).subscribe(() => {
        this.toastr.info(`El ticket ${ticket.nombre} fue actualizado con exito`, 'Ticket actualizado');
        this.loading = false;
        this.router.navigate(['/ticket']);
      })
    } else {
      //Es crear
      this._ticketService.crateTicket(ticket).subscribe(() => {
        this.toastr.success(`El ticket ${ticket.nombre} fue agregado con exito`, 'Ticket agregado')
        this.loading = false;
        this.router.navigate(['/ticket']);
      })
    }
    



  }

  getTicket(id: string) {
    this.loading = true;
    this._ticketService.getTicket(id).subscribe((data: Ticket) => {
      this.loading = false;
      this.formTicket.patchValue({
        nombre: data.nombre,
        location: data.location,
      })
    })
  }

}

