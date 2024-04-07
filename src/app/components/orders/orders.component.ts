import { Component } from '@angular/core';
import { OrderDetail } from '../order-detail/order-detail.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink,OrderDetail],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  detailSelected = false;

  selectedOrder(){
    this.detailSelected = true;
  }
}
