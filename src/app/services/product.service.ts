import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Category } from '../interfaces/category';
import { Observable, concatMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{
  products = signal<Product[]>([]);
  productsLoaded:any
  categories = signal<Category[]>([]);
  http = inject(HttpClient)
  constructor() {
    super()
    this.getAll();
   }

  public getAll(){
     this.http.get<Product[]>(`${this.postApi}/products`).pipe(
      concatMap((products) => {
        return this.http.get<Category[]>(`${this.postApi}/categories`).pipe(
          map((categories) => {
            return { products, categories };
          })
        );
      })
    )
    .subscribe((result) => {
      let {products,categories} = result;
      this.products.set(products)
      categories = categories.filter((currCategory) => {
        return currCategory.products.length > 0
      })
      this.categories.set(categories);
     })
    }
}
