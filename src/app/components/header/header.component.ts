import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faHeart,faUser } from '@fortawesome/free-regular-svg-icons';
import {faCartShopping,faRightFromBracket,faUser as faUserSolid,faBell,faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { StandardAuth } from '../../services/auth/standard.service';
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
  faRightFromBracket = faRightFromBracket;
  faUserSolid = faUserSolid
  faBell = faBell
  faHeartSolid = faHeartSolid
  authService = inject(StandardAuth)
  router = inject(Router)

  ngOnInit(){

  }

}
