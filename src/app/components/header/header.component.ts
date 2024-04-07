import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faHeart,faUser } from '@fortawesome/free-regular-svg-icons';
import {faCartShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
standalone: true,
  imports: [RouterLink,FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faHeart = faHeart;
  faCartShopping = faCartShopping
  faUser = faUser;
  ngOnInit(){

  }

}
