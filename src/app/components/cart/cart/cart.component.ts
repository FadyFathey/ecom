// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product';
import { CartService } from 'src/app/services/cart/cart.service';

interface CartItem extends Product {
  quantity?: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  cartItems: CartItem[] = [];
  private readonly TAX_RATE = 0.08; // 8% tax rate

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      // Add quantity property to items if not present
      this.cartItems = items.map((item) => ({
        ...item,
        quantity: (item as CartItem).quantity || 1,
      }));
    });
  }

  trackByProductId(index: number, item: CartItem): number {
    return item.id;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/fallback.jpg';
  }

  getItemQuantity(item: CartItem): number {
    return item.quantity || 1;
  }

  getItemTotal(item: CartItem): number {
    return item.price * this.getItemQuantity(item);
  }

  increaseQuantity(item: CartItem): void {
    if (!item.quantity) {
      item.quantity = 1;
    }
    item.quantity++;
  }

  decreaseQuantity(item: CartItem): void {
    if (!item.quantity) {
      item.quantity = 1;
    }
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
    });
  }

  getTotalItems(): number {
    return this.cartItems.reduce(
      (total, item) => total + this.getItemQuantity(item),
      0
    );
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + this.getItemTotal(item),
      0
    );
  }

  getTax(): number {
    return Math.round(this.getSubtotal() * this.TAX_RATE * 100) / 100;
  }

  getTotal(): number {
    return Math.round((this.getSubtotal() + this.getTax()) * 100) / 100;
  }
}
