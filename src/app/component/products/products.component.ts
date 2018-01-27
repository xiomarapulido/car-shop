import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe((data => { this.products = data; }));
  }

}
