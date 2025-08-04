import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private cartService = inject(CartService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  checkoutForm = this.fb.group({
    name: [''],
    email: [''],
    address: ['']
  });

  cartItems = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;

  updateQuantity(productId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onSubmit(): void {
    console.log('Order submitted', this.checkoutForm.value);
    this.cartService.clearCart();
    this.router.navigate(['/thank-you']);
  }

}
