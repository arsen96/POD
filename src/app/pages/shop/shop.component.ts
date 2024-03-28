import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {MatSliderModule} from '@angular/material/slider';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,MatSliderModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

}
