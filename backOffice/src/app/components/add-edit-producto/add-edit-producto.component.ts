import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID, Producto } from 'src/app/interfaces/producto';
import { ListProductosComponent } from '../list-productos/list-productos.component';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/interfaces/ticket';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-producto',
  templateUrl: './add-edit-producto.component.html',
  styleUrls: ['./add-edit-producto.component.css']
})
export class AddEditProductoComponent {
  formProducto: FormGroup;
  loading: boolean = false;
  idProducto: string;
  idTicket: string;
  operacion: string = 'Añadir ';

  constructor(private fb: FormBuilder,
    private _productService: ProductosService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _location: Location) {
    this.formProducto = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      name: ['', Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required],
      totalPrice: [null]
    })
    this.idProducto = aRouter.snapshot.paramMap.get("idProducto")!;
    this.idTicket = aRouter.snapshot.paramMap.get("idTicket")!;
  }
  ngOnInit(): void {
    if (this.idProducto != null) {
      this.operacion = 'Actualizar ';
      this.getProduct(this.idProducto);
    }
  }

  goBack(){
    this._location.back();
  }


  addProducto() {
    const product: Producto = {
      name: this.formProducto.value.name,
      quantity: this.formProducto.value.quantity,
      price: this.formProducto.value.price,
      totalprice: this.formProducto.value.totalPrice,

    }

    this.loading = true;
    if (this.idProducto !== null) {
      //Es update
      this._productService.updateProducto(this.idProducto, product).subscribe(() => {
        this.toastr.info(`El producto ${product.name} fue actualizado con exito`, 'Producto actualizado');
        this.loading = false;
        if (this.idTicket !== null) {
          this.router.navigate([`/ticket/${this.idTicket}/productos`]);
        }
        else{
          this.router.navigate([`/producto`]);
        }
       
      })
    } else {
      //Es crear
      this._productService.crateProducto(product).subscribe((data:Producto) => {
        this.toastr.success(`El producto ${product.name} fue agregado con exito`, 'Producto agregado')
        this.loading = false;
        this.idProducto=String(data._id!);
        console.log(data);
        
        //Es añadir el producto al ticket
        if (this.idTicket !== null) {
          this._productService.insertProductoToTicket(this.idTicket,this.idProducto).subscribe();
        }

        if (this.idTicket !== null) {
          this.router.navigate([`/ticket/${this.idTicket}/productos`]);
        }else{
          this.router.navigate([`/producto`]);
        }
      })

    }
    



  }

  getProduct(id: string) {
    this.loading = true;
    this._productService.getProducto(id).subscribe((data: Producto) => {
      this.loading = false;
      this.formProducto.patchValue({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        totalPrice: data.totalprice,
      })
    })
  }

}
