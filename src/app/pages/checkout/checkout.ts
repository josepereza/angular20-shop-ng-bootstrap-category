import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,DecimalPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private router = inject(Router);

  checkoutForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    paymentMethod: ['credit-card', Validators.required]
  });

  cartItems = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Orden enviada:', this.checkoutForm.value);
      this.cartService.clearCart();
      this.router.navigate(['/thank-you']);
    }
  }
}

