import { Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  ngAfterViewInit(): void {
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      loop: false,
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: false, // Prevent sliding to clicked slide
      noSwiping: true,
      loop: false,
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;


    Array.from(galleryThumbs.slides).forEach(function(slide, index) {
      slide.addEventListener('click', function() {
          galleryTop.slideTo(index);
      });
  });
    
}


}
