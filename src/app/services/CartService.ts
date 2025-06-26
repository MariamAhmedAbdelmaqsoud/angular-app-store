import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<any[]>([]);
  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }
  }
  addToCart(product: any, quantity: number) {
    const items = this.cartItems();
    const existingItem = items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.cartItems.set([...items]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
  removeFromCart(productId: number) {
    const updatedItems = this.cartItems().filter(
      (item) => item.product.id !== productId
    );
    this.cartItems.set([...updatedItems]);
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
  clearCart() {
    this.cartItems.set([]);
    localStorage.setItem('cart', JSON.stringify([]));
  }
  increaseItemQuantity(productId: number) {
    const items = this.cartItems();
    const item = items.find((i) => i.product.id === productId);
    if (item && item.quantity < item.product.stock) {
      item.quantity++;
      this.cartItems.set([...items]);
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }
  }

  decreaseItemQuantity(productId: number) {
    const items = this.cartItems();
    const item = items.find((i) => i.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartItems.set([...items]);
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }
  }
}
