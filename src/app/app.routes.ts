import { Routes } from '@angular/router';
import { accessControlsGuard } from './guards/access-controls.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about-me',
        loadComponent: () => import('./pages/about-me/about-me.component').then(m => m.AboutMeComponent)
    },
    {
        path: 'shop',
        loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
    },
    {
        path: 'detail',
        loadComponent: () => import('./pages/detail/detail.component').then(m => m.DetailComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate:[accessControlsGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
    },
    {
        path: 'account',
        loadComponent: () => import('./pages/account/account.component').then(m => m.AccountComponent)
    },
    {
        path: 'test',
        loadComponent: () => import('./pages/test/test.component').then(m => m.TestComponent)
    },
    {
        path: '**',
        redirectTo: 'home'
    }

];
