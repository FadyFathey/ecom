import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/product';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/products';

  getProdcuts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
