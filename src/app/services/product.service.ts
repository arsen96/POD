import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Category } from '../interfaces/category';
import { Observable, concatMap, map } from 'rxjs';
import { CategorySort } from '../pages/shop/shop.component';

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

      categories = categories.map(currCategory => {
        let currProduct = currCategory.products.map((catProduct) => {
          return products.find((currProduct) => {
            return currProduct.id === catProduct.id;
          })
        })
        currProduct = currProduct.sort((a:any,b:any) => {
          return (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
        })
        return {...currCategory,products:currProduct}
      }) as Category[];

      this.categories.set(categories);
     })
    }

    getCategoryProductsByName(name:string):Category{
      return this.categories().find((category) => {
        return category.name.toLowerCase() === name;
      }) as Category;
    }

    sortByCategoryProducts(value:string,categoryInstance:Category){
      if(value === String(CategorySort.date_new_to_old) || value === String(CategorySort.date_old_to_now)){
        categoryInstance.products.sort((a:any,b:any) => {
          if(value === String(CategorySort.date_new_to_old)){
            return (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
          }else{
            return (new Date(a.created_at) as any) - (new Date(b.created_at) as any);
          }
        })
      }else if(value === String(CategorySort.price_high_to_low) || value === String(CategorySort.price_low_to_hight)){
        categoryInstance.products.sort((a:any,b:any) => {
          if(value === String(CategorySort.price_high_to_low)){
            return b.price - a.price;
          }else{
            return a.price - b.price;
          }
        })
      }else if(value === String(CategorySort.a_z) || value === String(CategorySort.z_a)){
        categoryInstance.products.sort((a, b) => {
          if(value === String(CategorySort.a_z)){
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
          }else{
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
          }
          return 0;
        });
      }
    }
}
