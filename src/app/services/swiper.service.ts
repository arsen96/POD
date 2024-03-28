import { Injectable } from '@angular/core';
import Swiper from 'swiper';

@Injectable({
  providedIn: 'root'
})
export class SwiperService {
  constructor() { }

  public hero(selector:string){
    new Swiper(selector, {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl:'.swiper-button-next',
        prevEl:'.swiper-button-prev',
        enabled:true
      },
    });
  }

  public products(htmlSelector:HTMLElement,config:any){
    new Swiper(htmlSelector, {
      loop: true,
      navigation:false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets:true
      },
      breakpoints: {
        640: {
          slidesPerView: config['640']?.slidesPerView || 1,
          spaceBetween: config['640']?.spaceBetween || 20,
        },
        768: {
          slidesPerView: config['768']?.slidesPerView || 1,
          spaceBetween: config['640']?.spaceBetween || 768,
        },
      },
    });
  }


  public thumbsGallery(galleryElement:HTMLElement,thumbElement:HTMLElement){
    const galleryTop = new Swiper(galleryElement, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
	 		loop: false,
    });
    const galleryThumbs = new Swiper(thumbElement, {
      slidesPerView: 'auto',
      slideToClickedSlide: false, // Prevent sliding to clicked slide
      loop: false,
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;

    let galleryThumbsElements = Array.from(galleryThumbs.slides)
    galleryThumbsElements.forEach((slide, index)=> {
      slide.addEventListener('click', () => {
        galleryThumbsElements.forEach((elemSlide) => {
          elemSlide.classList.remove("active")
        })
        slide.classList.add("active")
          galleryTop.slideTo(index);
      });
  });
  }
}
