import { Routes } from '@angular/router';

export const routes: Routes = [
  {

    path: '',
    loadComponent: () =>
      import('./product-page/product-page').then((m) => m.ProductPage),
  },
  {
    path: 'product-page',
    loadComponent: () =>
      import('./product-page/product-page').then((m) => m.ProductPage),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product/product').then((m) => m.Product),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart').then((m) => m.Cart),
  },
];
