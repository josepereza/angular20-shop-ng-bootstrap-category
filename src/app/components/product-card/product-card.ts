import { Component, Input, Pipe } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart-service';
import { DecimalPipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, NgOptimizedImage],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
   @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

}
