import { Component, OnInit, OnDestroy } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { CartService } from '../services/CartService';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private router = inject(Router);
  cartItems = this.cartService.cartItems;
  products = signal<any[]>([]);
  constructor(private api: Api) {}
  subscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.api.getItems().subscribe((res: any) => {
      this.products.set(res.products);
      console.log(res.products);
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
  }
  isInCart(productId: number): boolean {
    return this.cartService
      .cartItems()
      .some((item) => item.product.id === productId);
  }
  handleCartClick(product: any) {
    if (!this.isInCart(product.id)) {
      this.cartService.addToCart(product, 1);
    } else {
      this.router.navigate(['/cart']);
    }
  }
}