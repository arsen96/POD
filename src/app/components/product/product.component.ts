import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faHeart } from '@fortawesome/free-regular-svg-icons';
import {faExpand} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({alias: 'product'}) eachProduct: Product;
  faHeart = faHeart;
  faExpand = faExpand;

}
