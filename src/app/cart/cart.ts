import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/CartService';
@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }
  cleanCart() {
    this.cartService.clearCart();
  }
  getTotal() {
    return this.cartItems().reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }
}
