import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID, User } from 'src/app/interfaces/user';
//import { ListUsersComponent } from '../list-productos/list-productos.component';

import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent {
  formUsers: FormGroup;
  loading: boolean = false;
  idUser: string;
  operacion: string = 'Añadir ';

  constructor(private fb: FormBuilder,
    private _usersService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _location: Location) {
    this.formUsers = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      name: ['', Validators.required],
      surname: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required] 
    })
    this.idUser = aRouter.snapshot.paramMap.get("idUser")!;

  }
  ngOnInit(): void {
    if (this.idUser != null) {
      this.operacion = 'Actualizar ';
      this.getUser(this.idUser);
    }
  }

  goBack(){
    this._location.back();
  }


  addUser() {
    const user: User = {
      name: this.formUsers.value.name,
      surname: this.formUsers.value.surname,
      email: this.formUsers.value.email,
      password: this.formUsers.value.password,

    }

    this.loading = true;
    if (this.idUser !== null) {
      //Es update
      this._usersService.updateUser(this.idUser, user).subscribe(() => {
        this.toastr.info(`El usuario ${user.name} fue actualizado con exito`, 'Usuario actualizado');
        this.loading = false;
        //if (this.idUser !== null) {
          //this.router.navigate([`/ticket/${this.idTicket}/productos`]);
        //}
        //else{
          //this.router.navigate([`/producto`]);
       // }
       this.router.navigate([`/`]);
       
      })
    } else {
      //Es crear
      this._usersService.crateUser(user).subscribe((data:User) => {
        this.toastr.success(`El usuario ${user.name} fue agregado con exito`, 'User agregado')
        this.loading = false;
        this.idUser=String(data._id!);
        
        //Es añadir el usuaio al ticket
        //if (this.idTicket !== null) {
          //this._usersService.insertProductoToTicket(this.idTicket,this.idUser).subscribe();
        //}

        //if (this.idTicket !== null) {
          //this.router.navigate([`/ticket/${this.idTicket}/productos`]);
        //}else{
          //this.router.navigate([`/producto`]);
        //}
        //this.router.navigate([`/`]);
      })

    }
    
  }

  getUser(id: string) {
    this.loading = true;
    this._usersService.getUser(id).subscribe((data: User) => {
      this.loading = false;
      this.formUsers.patchValue({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
      })
    })
  }

}