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
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  imports: [CommonModule,HeaderComponent,FontAwesomeModule,FooterComponent,MatSliderModule,ProductComponent,FormsModule, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  productService = inject(ProductService)
  products = signal<Product[]>([]);
  catSlug = signal<string>('')
  sortBy:string = ''; 
  categoryProducts = signal<Partial<Category>>({});  
  currentCategory:Category
  mainCategory:Category
  originalCategory:Category
  selectedCategory:string = CategorySort.date_new_to_old;
  currentPage: number = 1;
  itemsPerPage:number = 12;
  minPriceSelected:number = 0;
  maxPriceSelected:number = 0;
  maxPriceProduct:number = 0;
  minPriceProduct:number = 0;
  maxPrice:number;
  minPrice:number;
  get CategorySort(){
    return CategorySort;
  }

  faClose = faClose;

  priceFilter():any {
    this.currentPage = 1;
    if(this.selectedCategory !== CategorySort.price_low_to_hight){
      this.onChange(CategorySort.price_low_to_hight);
    }
    this.selectedCategory = CategorySort.price_low_to_hight;
    this.currentCategory.products = this.originalCategory.products.filter((element) => {
      return element.price >= this.minPriceSelected && element.price <=this.maxPriceSelected
    })
  }
  
  constructor(public route:ActivatedRoute,public router:Router, public serializer: UrlSerializer){
    this.route.params.subscribe(async (params:Params) => {
      this.catSlug.set(params['id']);
      console.log("tesstt")
    })

    this.route.queryParams.subscribe(async (params:Params) => {
      if(params['sortBy']){
        this.sortBy = params['sortBy'];
        this.selectedCategory = this.sortBy;
      }

      if(params['p']){
        this.currentPage = params['p'];
      }

      if(params['category']){
        this.catSlug.set(params['category'])
      }

    })

  }

  loadSubCategoryProducts(category:Category){
    this.addPageParameter('category',category.slug);
  }

  currentProducts = computed(() => {
    const result = {...this.productService.getCategoryProductsBySlug(this.productService.categories(),this.catSlug())};
    if(result){
      this.currentCategory =  result as Category
      
      this.originalCategory = {...this.currentCategory};
      const mainCategory = this.productService.searchMainCategoryById(this.currentCategory.main ? this.currentCategory.id : this.currentCategory.parentId);
      if(mainCategory){
        this.mainCategory = mainCategory
        this.manageCategoryCollapseToggle();
      }
      if(this.currentCategory?.products){
        this.onChange(this.sortBy);
        const prices = this.currentCategory.products.map(element => {
          return element.price
        })
        this.maxPriceSelected = this.maxPriceProduct = this.maxPrice = Math.max(...prices);
        this.minPriceSelected = this.minPriceProduct = this.minPrice = Math.min(...prices);
      }
      
      return this.currentCategory;
    }
    return result; 
  })

  rmChildCategorySelection($event:Event){
    $event.stopPropagation();
    this.manageCategoryCollapseToggle(false);
    this.router.navigateByUrl('shop/'+this.mainCategory.slug)
    if(this.mainCategory?.slug){
      this.catSlug.set(this.mainCategory.slug);
    }
  }

  manageCategoryCollapseToggle(show = true){
    if(this.mainCategory){
      this.mainCategory.widgets.forEach((item) => {
        item.show = false;
        if(item.widgets && show){
          item.widgets.forEach((elem) => {
            if(this.catSlug() === elem.slug){
              item.show = true;
            }
          })
        }
      })
    }
  }

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
