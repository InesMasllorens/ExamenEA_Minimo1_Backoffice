import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ID, Actividad } from 'src/app/interfaces/actividad';
import { ActividadService } from 'src/app/services/actividad.service';

 

@Component({
  selector: 'app-list-actividad',
  templateUrl: './list-actividad.component.html',
  styleUrls: ['./list-actividad.component.css']
})
export class ListActividadesComponent {
  listActividades: Actividad[] = [];
  loading: boolean = false;
  idActividad: string;
  idUser: string;

  constructor(private _actividadService: ActividadService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.idActividad = aRouter.snapshot.paramMap.get("idActividad")!;
    this.idUser = aRouter.snapshot.paramMap.get("idUser")!;
  }

  ngOnInit(): void {
    if (this.idActividad != null) {
      this.getListActividades()
      //this.getUsersTicket(this.idUser);
    }else{
      this.getListActividades()
    }
    
  }

  getListActividades() {
    this.loading = true;
    this._actividadService.getListActividades().subscribe((data: Actividad[]) => {
      this.listActividades = data;
      this.loading = false;
    })
  }

  deleteActividad(id: ID) {
    this.loading = true;
    this._actividadService.deleteActividad(id).subscribe(() => {
      //this.loading=false;
      if (this.idUser != null) {
        this.getActividadUser(this.idUser);
      }else{
      this.getListActividades()
      }
      this.toastr.warning('La actividad fue eliminado con exito', 'actividad eliminada');
    });
  }

  getActividadUser(id:string) {
    this.loading = true;
    this._actividadService.getActividadUser(id).subscribe((data: Actividad[]) => {
      this.listActividades = data;
      this.loading = false;
    })
  }

}