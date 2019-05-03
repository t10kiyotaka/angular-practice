import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4MDEwNjVlNGI1NjNhZWVlZWIzNTkwOTEwZDlmOTc3YTgxMjMwOWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYW5ndWxhci1zYW1wbGUtZmI5ZTQiLCJhdWQiOiJhbmd1bGFyLXNhbXBsZS1mYjllNCIsImF1dGhfdGltZSI6MTU1Njg2NjM2MSwidXNlcl9pZCI6Imx6UldhVmFYTHdSN0FFQmIzcHh4eGF0TFBQOTIiLCJzdWIiOiJselJXYVZhWEx3UjdBRUJiM3B4eHhhdExQUDkyIiwiaWF0IjoxNTU2ODY2MzYxLCJleHAiOjE1NTY4Njk5NjEsImVtYWlsIjoidDEwa2l5b3Rha2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInQxMGtpeW90YWthQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.CGKdsjtE6kc4nTk87yitBfxVov-Fj6CvPrTQ53p-5qV0L9Ue6VxLxNBz0jRut1zq0ER_NhHxqocj8oGMkQyU8XZA3OH2GFhcyFDjLsYyn2MuM0ESGWvoBnb3EPgx7ukqqsw8XeBLQY1o3e2tkIfLA18kjUkUfKF5O4ajkk9RVXnvzktxlfuRprb8JGrIcgNdZz7h6yO-YnJZTEPo_pAW43ZKq6ZS4pu4afwzG8mGDg6tRNERJglbtucnVD67MM-Bfs4Zt69Jzww4GJa7yH6uhmNc7DQqgs-wX2uF88RyxHz1s7yEe8RtAl0iJV8QsjehyXw5DN1mDKPymeEzC-X2eA'

  products = [
    new Product(1, 'Angular入門書', 3800, 'Angular入門書の説明'),
    new Product(2, 'Angular覚えたら人生変わった！', 410, '年収300万のSEが、Angularと出会う。それは、小さな会社の社畜が始めた、最初の抵抗だった。'),
    new Product(3, '異世界転生から始めるAngular生活', 680, 'スパゲッティの沼でデスマーチ真っ最中の田中。過酷な日々からの現実逃避か彼は、異世界に放り出され、そこでAngularの入門書を拾う。現実逃避でさえ、プログラミングをするしかない彼に待ち受けるのは！？'),
  ];

  constructor(
    private http: HttpClient,
  ) { }

  // list(): Observable<Product[]> {
  //   return this.http.get('https://angular-sample-fb9e4.firebaseio.com/products.json', { params: { auth: this.TOKEN } }).pipe(
  //     map((response: any) =>
  //       Object.keys(response).map((key: string) => {
  //         const prd = response[key];
  //         return new Product(prd.id, prd.name, prd.price, prd.description)
  //       })
  //     )
  //   );
  // }

  list(): Observable<Product[]> { 
    return this.http.get(`https://angular-sample-fb9e4.firebaseio.com/products.json`, { params: { auth: this.TOKEN } }).pipe(
      map((response: any) =>
        Object.keys(response).map((key: string) => {
          const prd = response[key];
          return new Product(prd.id, prd.name, prd.price, prd.description);
        })
      )
    );
  }

  get(id: number): Observable<Product> {
    return of(this.products[id - 1]);
  }

  update(product: Product): void {
    const index = this.products.findIndex((prd: Product) => prd.id === product.id)
    this.products[index] = product;
  }
}
