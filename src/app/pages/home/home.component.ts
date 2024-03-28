import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../services/product.service';
import Swiper from 'swiper';
import { SwiperService } from '../../services/swiper.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,HeaderComponent,FooterComponent,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {

  @ViewChild('brandsSlider') brandsSlider:ElementRef;
  @ViewChild('homeSlider') homeSlider:ElementRef;
  constructor(public productService:ProductService,public swiper:SwiperService){

  }

  ngOnInit(){
    this.productService.getAll();
    
  }

  ngAfterViewInit() {
    this.swiper.hero(this.homeSlider.nativeElement);
    this.swiper.products(this.brandsSlider.nativeElement,{
      '640': { slidesPerView: 2, spaceBetween: 20 },
      '768': { slidesPerView: 4, spaceBetween: 40 },
    })
    
  }

}
