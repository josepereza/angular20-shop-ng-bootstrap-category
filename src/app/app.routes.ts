import { Routes } from '@angular/router';
import { Hero } from './pages/hero/hero';
import { ProductList } from './pages/product-list/product-list';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { ThankYou } from './pages/thank-you/thank-you';

export const routes: Routes = [
    {
        path:'', component:Hero
    },
    {
        path:'listado', component:ProductList
    },
    {
        path:'cart', component:Cart
    },
    {
        path:'checkout', component:Checkout
    },
    {
        path:'thank-you', component:ThankYou
    },
    {
        path:'**', redirectTo: ''
    }
];
