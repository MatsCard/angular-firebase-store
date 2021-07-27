/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';
import { CartService} from './../../../core/services/cart.service';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      
    });

  }  


  fetchProduct(id: string): void {
    this.productsService.getProduct(id)
    .subscribe(product => {
      this.product = product;
    });
  }


  addCart(): any{
      this.cartService.addCart(this.product);
  }
}
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {switchMap} from 'rxjs/operators'
import {Observable} from 'rxjs'
import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$:Observable<Product> //convertido a observable

  constructor(
    private route:ActivatedRoute,
    private productsService:ProductsService
    ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(
        switchMap((params:Params) => {
          return this.productsService.getProduct(params.id)
        })
      )
      
      console.log(this.product$)
      // .subscribe((product)=>{
      //   this.product = product
      // })
  }

  

}