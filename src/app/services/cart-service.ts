import { Injectable, inject } from '@angular/core';
import { signal, computed } from '@angular/core';
import { Product } from '../interfaces/product';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems = signal<CartItem[]>([]);

  cartItems = this._cartItems.asReadonly();
  
  totalItems = computed(() => 
    this._cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );
  
  totalPrice = computed(() =>
    this._cartItems().reduce((acc, item) => 
      acc + (item.product.price * item.quantity), 0)
  );

  addToCart(product: Product): void {
    const existingItem = this._cartItems().find(item => 
      item.product.id === product.id);
    
    if (existingItem) {
      this._cartItems.update(items => 
        items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      this._cartItems.update(items => 
        [...items, { product, quantity: 1 }]
      );
    }
  }

  removeFromCart(productId: number): void {
    this._cartItems.update(items => 
      items.filter(item => item.product.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    this._cartItems.update(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  }

  clearCart(): void {
    this._cartItems.set([]);
  }
}