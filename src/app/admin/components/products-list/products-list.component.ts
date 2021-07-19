import { Component, OnInit } from '@angular/core';

import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void{
    this.productService.getAllProducts()
    .subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: string): void{
    this.productService.deleteProduct(id)
    .subscribe(rta => {
      if (rta) {
        const index = this.products.findIndex(product => product.id === id);
        this.products.splice(index, 1);
        this.products = [...this.products];
      }
    });
  }

}
