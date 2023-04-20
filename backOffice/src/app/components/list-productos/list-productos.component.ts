import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ID, Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent {
  listProducts: Producto[] = [];
  loading: boolean = false;
  idTicket: string;

  constructor(private _productoService: ProductosService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.idTicket = aRouter.snapshot.paramMap.get("idTicket")!;
  }

  ngOnInit(): void {
    if (this.idTicket != null) {
      this.getProductosTicket(this.idTicket);
    }else{
      this.getListProductos()
    }
    
  }

  getListProductos() {
    this.loading = true;
    this._productoService.getListProductos().subscribe((data: Producto[]) => {
      this.listProducts = data;
      this.loading = false;
    })
  }

  deleteProducto(id: ID) {
    this.loading = true;
    this._productoService.deleteProducto(id).subscribe(() => {
      //this.loading=false;
      if (this.idTicket != null) {
        this.getProductosTicket(this.idTicket);
      }else{
        this.getListProductos()
      }
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
    });
  }

  getProductosTicket(id:string) {
    this.loading = true;
    this._productoService.getProductosTicket(id).subscribe((data: Producto[]) => {
      this.listProducts = data;
      this.loading = false;
    })
  }

}
