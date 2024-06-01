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
      this.categories.set(categories);
      console.log("categories",categories)
     })
    }

    getCategoryProductsBySlug(categories: Category[], slug: string): Category | undefined {
      let category;
      for (const category of categories) {
        if (category.slug === slug) {
          return category;
        }
        if (category.widgets) {
          const found = this.getCategoryProductsBySlug(category.widgets, slug);
          if (found) {
            return found;
          }
        }
      }
      return category; 
    }

    searchMainCategoryById(categoryId:number): Category | undefined{
      let selectedCategory;
      for (const category of this.categories()) {
        if(category.id === categoryId){
          selectedCategory =  category;
        }
      }
      return selectedCategory;
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
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
          }else{
            if (a.title < b.title) return 1;
            if (a.title > b.title) return -1;
          }
          return 0;
        });
      }
    }
}
