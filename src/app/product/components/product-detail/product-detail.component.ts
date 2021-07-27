import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

import { ProductsService} from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';
import { CartService} from './../../../core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
    )
    { }
    
    ngOnInit(): void {/* 
      console.log(this.route)
      console.log(this.route.params._value.id) */
    // escucha los cambios de los parametros
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProducts();
      // this.product = this.productsService.getProduct(id);
    });
  }

  fetchProduct(id: string): void {
    this.productsService.getProduct(id)
    .subscribe(product => {
      this.product = product;
    });
  }

  fetchProducts(): void {
    this.productsService.getAllProducts()
    .subscribe(products => {
      this.products = products;
    });
  }

  addCart(): any{
      // console.log('Añadir al carrito');
      this.cartService.addCart(this.product);
      // this.productClicked.emit(this.product);
  }
/*
  createProduct() {
    const newProduct: Product = {
      id: "6",
      title: "Stickers",
      image: "assets/images/stickers2.png",
      price: 4500,
      description: "Stickers Platzi"
    };
    this.productsService.createProduct(newProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 3000,
      description: 'segunda edicion description'
    };
    this.productsService.updateProduct('222', updateProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct('101')
    .subscribe(rta => {
      console.log(rta);
    });
  } */
}
