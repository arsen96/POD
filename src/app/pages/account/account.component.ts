import { Component, Inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { Account } from '../../enums/account';
import { WishlistComponent } from '../../components/wishlist/wishlist.component';
import { AddressesComponent } from '../../components/addresses/addresses.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { OrdersComponent } from '../../components/orders/orders.component';
import { OrderDetail } from '../../components/order-detail/order-detail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderComponent,HttpClientModule,FooterComponent,RouterLink,WishlistComponent,OrdersComponent,AddressesComponent,ProfileComponent,OrderDetail],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  selection:Account = Account.wishlist;
  public get Account(){
    return Account;
  }

  constructor(public http:HttpClient){

  }

  ngOnInit(){
    this.http.get("http://127.0.0.1:8000/api/categories").pipe(
      map((response:any) => response['hydra:member']) 
    ).subscribe((res) => {
      console.log("ress",res)
    })
  }

  profileSelection(selected:Account){
    this.selection = selected;
  }
}
