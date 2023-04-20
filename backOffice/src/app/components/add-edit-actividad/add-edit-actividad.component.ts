import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID, Actividad } from 'src/app/interfaces/actividad';
//import { ListUsersComponent } from '../list-productos/list-productos.component';

import { ActividadService } from 'src/app/services/actividad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-add-edit-actividad',
  templateUrl: './add-edit-actividad.component.html',
  styleUrls: ['./add-edit-actividad.component.css']
})
export class AddEditActividadComponent {
  formActividad: FormGroup;
  loading: boolean = false;
  idActividad: string;
  idUser: string;
  operacion: string = 'Añadir ';

  constructor(private fb: FormBuilder,
    private _actividadService: ActividadService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _location: Location) {
    this.formActividad = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      name: ['', Validators.required],
      nameActividad: ['', Validators.required],
      idTicketActividad: [null, Validators.required],
      pagado: ['', Validators.required] 
    })
    this.idActividad = aRouter.snapshot.paramMap.get("idActividad")!;
    this.idUser = aRouter.snapshot.paramMap.get("idUser")!;

  }
  ngOnInit(): void {
    if (this.idActividad != null) {
      this.operacion = 'Actualizar ';
      this.getActividad(this.idActividad);
    }
  }

  goBack(){
    this._location.back();
  }


  addActividad() {
    const actividad: Actividad = {
      name: this.formActividad.value.name,
      nameActividad: this.formActividad.value.nameActividad,
      idTicketActividad: this.formActividad.value.idTicketActividad,
      pagado: this.formActividad.value.pagado,

    }

    this.loading = true;
    if (this.idActividad !== null) {
      //Es update
      this._actividadService.updateActividad(this.idActividad, actividad).subscribe(() => {
        this.toastr.info(`La actividad ${actividad.nameActividad} fue actualizada con exito`, 'Actividad actualizada');
        this.loading = false;
        if (this.idUser !== null) {
          this.router.navigate([`/user/${this.idUser}/actividad`]);
        }
        else{
          this.router.navigate([`/actividad`]);
       }
       //this.router.navigate([`/`]);
       
      })
    } else {
      //Es crear
      this._actividadService.createActividad(actividad).subscribe((data:Actividad) => {
        this.toastr.success(`La actividad ${actividad.nameActividad} fue agregada con exito`, 'Actividad agregada')
        this.loading = false;
        this.idActividad=String(data._id!);
        
        //Es añadir la actividad al usuario
        if (this.idUser !== null) {
          this._actividadService.insertActividadToUser(this.idUser,this.idUser).subscribe();
        }

        if (this.idUser !== null) {
          this.router.navigate([`/user/${this.idUser}/actividad`]);
        }else{
          this.router.navigate([`/actividad`]);
        }
        this.router.navigate([`/`]);
      })

    }
    
  }

  getActividad(id: string) {
    this.loading = true;
    this._actividadService.getActividad(id).subscribe((data: Actividad) => {
      this.loading = false;
      this.formActividad.patchValue({
        name: data.name,
        nameActividad: data.nameActividad,
        idTicketActividad: data.idTicketActividad,
        pagado: data.pagado,
      })
    })
  }

}