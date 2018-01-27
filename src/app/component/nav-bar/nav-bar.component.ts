import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/interface';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {

  filter: string;
  products: Product;
  productsSubject: Subject<any> = new Subject<any>();
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  filterProduct() {
    this.productsService.sharedProducts(this.filter);
  }
}
