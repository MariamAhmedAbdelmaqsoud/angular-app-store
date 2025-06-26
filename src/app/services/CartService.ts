import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<any[]>([]);

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart && savedCart !== 'undefined') {
      this.cartItems.set(JSON.parse(savedCart));
    }

    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    });
  }

  addToCart(product: any, quantity: number) {
    const items = [...this.cartItems()];
    const existingItem = items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.cartItems.set(items); // auto-save via effect
  }

  removeFromCart(productId: number) {
    const updated = this.cartItems().filter(item => item.product.id !== productId);
    this.cartItems.set(updated); // auto-save via effect
  }

  clearCart() {
    this.cartItems.set([]);
  }

  increaseItemQuantity(productId: number) {
    const items = [...this.cartItems()];
    const item = items.find(i => i.product.id === productId);
    if (item && item.quantity < item.product.stock) {
      item.quantity++;
      this.cartItems.set(items);
    }
  }

  decreaseItemQuantity(productId: number) {
    const items = [...this.cartItems()];
    const item = items.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartItems.set(items);
    }
  }
}

