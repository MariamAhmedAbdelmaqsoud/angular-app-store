import { Component, inject, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/CartService';
@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private api = inject(Api);
  product = signal<any>(null);
  selectedImage: string = '';
  quantity = 1;

  increase() {
    if (this.product()?.stock > this.quantity) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.api.getItemById(+id).subscribe((res) => {
          this.product.set(res);
        });
      }
    });
  }
  handleAddToCart() {
    const item = this.product();
    if (item) {
      this.cartService.addToCart(item, this.quantity);
      alert('✔️ Product added to cart!');
    }
    console.log(item);
  }
}
