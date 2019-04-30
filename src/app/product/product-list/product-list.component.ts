import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = null
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.products = [
        new Product(1, 'Angular入門書', 3800, 'Angular入門書の説明'),
        new Product(2, 'Angular覚えたら人生変わった！', 410, '年収300万のSEが、Angularと出会う。それは、小さな会社の社畜が始めた、最初の抵抗だった。'),
        new Product(3, '異世界転生から始めるAngular生活', 680, 'スパゲッティの沼でデスマーチ真っ最中の田中。過酷な日々からの現実逃避か彼は、異世界に放り出され、そこでAngularの入門書を拾う。現実逃避でさえ、プログラミングをするしかない彼に待ち受けるのは！？'),
      ];
    }, 3000);
  }

}
