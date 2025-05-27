// src/app/components/product/product.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.productService.getProdcuts().subscribe((data) => {
      this.products = data;
    });
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/fallback.jpg';
  }
}
