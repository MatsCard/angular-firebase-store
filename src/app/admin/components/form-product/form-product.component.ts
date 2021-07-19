import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { MyValidators } from './../../../utils/validators';

import { ProductsService } from './../../../core/services/products/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveProduct(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe(newProduct => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
    console.log(this.form.value);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceVal]],
      image: '',
      description: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const taks = this.storage.upload(name, file);

    taks.snapshotChanges()
    .pipe(
      finalize(() => {
      this.image$ = fileRef.getDownloadURL();
      this.image$.subscribe(url => {
        console.log(url);
        this.form.get('image').setValue(url);
      });
      })
    )
    .subscribe();
  }
}
