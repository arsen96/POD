import { AfterViewInit, Component, ElementRef, Inject, OnInit, Query, QueryList, Renderer2, ViewChild, ViewChildren, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SwiperService } from '../../services/swiper.service';
import SwiperCore, { Swiper } from 'swiper';
import Thumbs from 'swiper';


declare var bootstrap: any;

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit,AfterViewInit {
  swiper = inject(SwiperService)
  thumbsSwiper: any;
  @ViewChild('sliderThumbsSlider') sliderThumbsSlider: ElementRef;
  @ViewChild('galleryProductSlider') galleryProductSlider: ElementRef;
  @ViewChild('similarSlider') similarSlider: ElementRef;
  
  constructor(public renderer:Renderer2){}
  ngOnInit(){
  }

  ngAfterViewInit(): void {
    this.swiper.thumbsGallery(this.galleryProductSlider.nativeElement,this.sliderThumbsSlider.nativeElement);
    this.swiper.products(this.similarSlider.nativeElement,{
      '640': { slidesPerView: 2, spaceBetween: 20 },
      '768': { slidesPerView: 3, spaceBetween: 40 },
    })
  }
}
