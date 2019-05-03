import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL = 'https://angular-sample-fb9e4.firebaseio.com';
  UID = 'lzRWaVaXLwR7AEBb3pxxxatLPP92';
  TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4MDEwNjVlNGI1NjNhZWVlZWIzNTkwOTEwZDlmOTc3YTgxMjMwOWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYW5ndWxhci1zYW1wbGUtZmI5ZTQiLCJhdWQiOiJhbmd1bGFyLXNhbXBsZS1mYjllNCIsImF1dGhfdGltZSI6MTU1Njg3MjQ2MSwidXNlcl9pZCI6Imx6UldhVmFYTHdSN0FFQmIzcHh4eGF0TFBQOTIiLCJzdWIiOiJselJXYVZhWEx3UjdBRUJiM3B4eHhhdExQUDkyIiwiaWF0IjoxNTU2ODcyNDYxLCJleHAiOjE1NTY4NzYwNjEsImVtYWlsIjoidDEwa2l5b3Rha2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInQxMGtpeW90YWthQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.InyEZ4YYO7lZT8Pr0V_nwOz8DEoDArUKFzuIII3CXGVIk-j4qxKRfPjhp6kyduUHVjnfORoJLi89GXb0fwvRW9jc_7HDw35zy6R3fIPlDX7CE2Ls-bedPs_eyXoiZov3Sp1-fbiLTdPfqc8t4Jim64e8AkgNlzWqvW0XcCKTyaNXUVZhjOy6FHp5tm9aS0FM3iUSjI_MfNCLqpn6ByRYCOIEM5KZH3PvL5RWYdk7-7jyposaAziWz0DISRaoSUZTM_lljVZoWexzb5nF6x3RoFE1dByv73oTZdlTZjJjVgDJGN6drSvwlvAF_32tl3-4SFxEEGcfcvySah7Nx7xTqg'

  products = [
    new Product(1, 'Angular入門書', 3800, 'Angular入門書の説明'),
    new Product(2, 'Angular覚えたら人生変わった！', 410, '年収300万のSEが、Angularと出会う。それは、小さな会社の社畜が始めた、最初の抵抗だった。'),
    new Product(3, '異世界転生から始めるAngular生活', 680, 'スパゲッティの沼でデスマーチ真っ最中の田中。過酷な日々からの現実逃避か彼は、異世界に放り出され、そこでAngularの入門書を拾う。現実逃避でさえ、プログラミングをするしかない彼に待ち受けるのは！？'),
  ];

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<Product[]> { 
    return this.http.get(`${this.BASE_URL}/users/${this.UID}/products.json`, { params: { auth: this.TOKEN } }).pipe(
      map((response: any) =>
        Object.keys(response).map((key: string) => {
          const prd = response[key];
          return new Product(prd.key, prd.name, prd.price, prd.description);
        })
      )
    );
  }

  get(id: number): Observable<Product> {
    return of(this.products[id - 1]);
  }

  create(product: Product): Observable<void> {
    return this.http.post(`${this.BASE_URL}/users/${this.UID}/products.json`, product, { params: {auth: this.TOKEN } }).pipe(
      map((response: any) => product.key = response.name),
    );
  }

  update(product: Product): void {
    const index = this.products.findIndex((prd: Product) => prd.key === product.key)
    this.products[index] = product;
  }
}
