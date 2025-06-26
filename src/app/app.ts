import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { ProductPage } from './product-page/product-page'
import { Product } from './product/product';
import { RouterModule } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Cart } from './cart/cart';


@Component({
  selector: 'app-root',
  imports: [Navbar, ProductPage, Product, RouterModule, Register, Login, Cart],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'product-app';
}
