import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { AddEditProductoComponent } from './components/add-edit-producto/add-edit-producto.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { AddEditTicketComponent } from './components/add-edit-tickets/add-edit-tickets.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AddEditUsersComponent } from './components/add-edit-users/add-edit-users.component';
import { AddEditActividadComponent } from './components/add-edit-actividad/add-edit-actividad.component';
import { ListActividadesComponent } from './components/list-actividad/list-actividad.component';

const routes: Routes = [
  
  {path:'ticket',component:ListTicketsComponent},
  {path:'ticket/add',component:AddEditTicketComponent},
  {path:'ticket/edit/:idTicket',component:AddEditTicketComponent},
  {path:'ticket/:idTicket/productos',component:ListProductosComponent},
  {path:'ticket/:idTicket/productos/add',component:AddEditProductoComponent},
  {path:'ticket/:idTicket/productos/edit/:idProducto',component:AddEditProductoComponent},
  {path:'producto',component:ListProductosComponent},
  {path:'producto/add',component:AddEditProductoComponent},
  {path:'producto/edit/:idProducto',component:AddEditProductoComponent},
  {path:'user',component:ListUsersComponent},
  {path:'user/add',component:AddEditUsersComponent},
  {path:'user/edit/:idUser',component:AddEditUsersComponent},
  {path:'actividad',component:ListActividadesComponent},
  {path:'actividad/add',component:AddEditActividadComponent},
  {path:'actividad/edit/:idActividad',component:AddEditActividadComponent},
  {path:'**',redirectTo:'',pathMatch:'full'} //Este siempre el ultimo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
