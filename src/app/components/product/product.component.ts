// src/app/components/product/product.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/product';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  products: Product[] = [];
  addingToCart: { [key: number]: boolean } = {}; // Track loading state per product
  addedToCart: { [key: number]: boolean } = {}; // Track success state per product

  ngOnInit(): void {
    this.productService.getProdcuts().subscribe((data) => {
      this.products = data;
    });
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/fallback.jpg';
  }

  addToCart(product: Product): void {
    // Set loading state
    this.addingToCart[product.id] = true;

    this.cartService.addToCart(product).subscribe({
      next: (response) => {
        // Clear loading state
        this.addingToCart[product.id] = false;

        // Set success state
        this.addedToCart[product.id] = true;

        // Clear success state after 2 seconds
        setTimeout(() => {
          this.addedToCart[product.id] = false;
        }, 2000);

        console.log('Product added to cart:', response);
      },
      error: (error) => {
        // Clear loading state
        this.addingToCart[product.id] = false;
        console.error('Error adding product to cart:', error);

        // You could show an error message here
        alert('Failed to add product to cart. Please try again.');
      }
    });
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  isAddingToCart(productId: number): boolean {
    return this.addingToCart[productId] || false;
  }

  isAddedToCart(productId: number): boolean {
    return this.addedToCart[productId] || false;
  }
}