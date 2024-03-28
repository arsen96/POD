import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:Product[] = [];
  constructor() { }

  public getAll(){
    for(let i=0; i<12;i++){
      const product:Product =  {
        name :"Black blouse",
        price : '$40.00',
        btn : "Add to cart",
        img:"https://demo.bootstrapious.com/varkala/2-1/img/product/0950354513_1_1_1.jpg"
      }
      if(i % 2 === 0){
        product.status = "Sold out";
      }
      this.products.push(product)
    }
  }
}
