import { Injectable } from '@angular/core';

// Aniade principios reactivos
import { BehaviorSubject } from 'rxjs';

import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: Product): void {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
}
