import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, NgModule, OnInit, Signal, ViewChild, ViewEncapsulation, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../services/product.service';
import { SwiperService } from '../../services/swiper.service';
import { Product } from '../../interfaces/product';
import { ProductPipe } from '../../pipes/product.pipe';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faHeart } from '@fortawesome/free-regular-svg-icons';
import {faExpand} from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../interfaces/category';
import { ProductComponent } from '../../components/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,HeaderComponent,FooterComponent,CarouselModule,ProductPipe,CommonModule,FontAwesomeModule,
    ProductComponent,NgxPaginationModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  faHeart = faHeart;
  faExpand = faExpand;

  products = signal<Product[]>([])
  categorySelected:string = '';
  @ViewChild('brandsSlider') brandsSlider:ElementRef;
  @ViewChild('homeSlider') homeSlider:ElementRef;
  p: number = 1;
  constructor(public productService:ProductService,public swiper:SwiperService){
    effect(() => {
      if(this.products().length === 0 && this.productService.products().length > 0){
        this.products.set(this.productService.products());
      }
    },{allowSignalWrites:true});
  }
  


  categorySelection(category?:Category){
    let products:Array<Product> = [];
    if(category){
      this.categorySelected = category.name;
      products = category.products.flatMap((currentCat) => {
        return this.productService.products().filter((product) => {
          return currentCat.id === product.id;
        })
      })
    }else{
      this.categorySelected = '';
      products = this.productService.products();
    }
    this.p = 1;
    this.products.set(products);
  }

  
  ngOnInit(){

   
  }
  ngAfterViewInit() {
    this.swiper.hero(this.homeSlider.nativeElement);
    this.swiper.products(this.brandsSlider.nativeElement,{
      '640': { slidesPerView: 2, spaceBetween: 20 },
      '768': { slidesPerView: 4, spaceBetween: 40 },
    })
    
  }

}
