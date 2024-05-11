import { Component, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {MatSliderModule} from '@angular/material/slider';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Params, Router, UrlSerializer } from '@angular/router';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { ProductComponent } from '../../components/product/product.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { PaginationEvents } from 'swiper/types';

export enum CategorySort{
  'featured'='featured',
  'bestSelling'='bestSelling',
  'a_z' = 'a_z',
  'z_a'= 'z_a',
  'price_low_to_hight' = 'price_low_to_hight',
  'price_high_to_low' = 'price_high_to_low',
  'date_old_to_now' = 'date_old_to_now',
  'date_new_to_old' = 'date_new_to_old'
}
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,MatSliderModule,ProductComponent,FormsModule, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  productService = inject(ProductService)
  products = signal<Product[]>([]);
  catName = signal<string>('')
  sortBy:string = ''; 
  categoryProducts = signal<Partial<Category>>({});  
  currentCategory:Category
  selectedCategory:string = CategorySort.date_new_to_old;
  currentPage: number = 1;
  itemsPerPage:number = 12;
  get CategorySort(){
    return CategorySort;
  }
  
  constructor(public route:ActivatedRoute,public router:Router, public serializer: UrlSerializer){
    this.route.params.subscribe(async (params:Params) => {
      this.catName.set(params['id']);
    })

    this.route.queryParams.subscribe(async (params:Params) => {
      if(params['sortBy']){
        this.sortBy = params['sortBy'];
        this.selectedCategory = this.sortBy;
      }

      if(params['p']){
        this.currentPage = params['p'];
      }
    })
  }

  currentProducts = computed(() => {
      this.currentCategory =   this.productService.getCategoryProductsByName(this.catName());
      if(this.currentCategory){
        this.onChange(this.sortBy);
      }
      return this.currentCategory;
  })

  onChange(event:Event | string){
    let value;
    if(event instanceof Event){
      value = (event.target as HTMLSelectElement).value
      this.addPageParameter('sortBy',value);
    }else{
      value = event;
    }
    this.productService.sortByCategoryProducts(value,this.currentCategory);
  }

  pageChanged($event:number){
    this.currentPage = $event;
    console.log(" this.currentPage", this.currentPage)
    this.addPageParameter('p',this.currentPage);
  }

  addPageParameter(key:string,value:string | number){
    this.router.navigate([], {
      queryParams: { [key]: value },
      queryParamsHandling: 'merge', 
      relativeTo: this.route 
    });
  }

}
