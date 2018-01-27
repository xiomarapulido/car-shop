import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';
import { Filter, Product } from '../models/interface';


@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  productsSubject: Subject<any> = new Subject<any>();
  productsObservable: Observable<Product[]>;
  products: Product;

  public getProducts(filter?: Filter[]): Observable<any> {
    this.getProductsFilter(filter);
    return this.productsSubject;
  }

  public getProductsFilter(filters?: Filter[]) {
    this.productsObservable = this.http.get('/assets/json/data.json').map((data: any) => data.products);
    if (filters) {
      filters.forEach((filter) => {
        if (filter.type === 'category') {
          this.productsObservable = this.productsObservable
            .map((products) => products.filter((product) => product.categories.includes(filter.id)));
          this.productsObservable.subscribe((products) => this.productsSubject.next(products));
        }
        if (filter.type === 'price') {
          if (filter.id === 1) {
            this.productsObservable = this.productsObservable
              .map((products) => products.filter((product) => parseFloat(product.price) < parseFloat('10.000')));
          }
          if (filter.id === 2) {
            this.productsObservable = this.productsObservable
              .map((products) => products.filter((product) => parseFloat(product.price) > parseFloat('30.000')));
          }
          this.productsObservable.subscribe((products) => this.productsSubject.next(products));
        }
        if (filter.type === 'stock') {
          if (filter.id === 1) {
            this.productsObservable = this.productsObservable
              .map((products) => products.filter((product) => product.available === true));
          }
          if (filter.id === 2) {
            this.productsObservable = this.productsObservable
              .map((products) => products.filter((product) => product.available === false));
          }
          if (filter.id === 3) {
            this.productsObservable = this.productsObservable
              .map((products) => products.filter((product) => product.Best_Seller === true));
          }
        }
      });
    }
    if (!filters) {
      this.productsObservable.subscribe((products) => this.productsSubject.next(products));
    }
  }

  public sharedProducts(filterName?: string) {
    filterName = filterName || '';
    this.productsObservable
      .map((products) => products.filter((product) => product.name.toUpperCase().indexOf(filterName.toUpperCase()) >= 0))
      .subscribe((products) => this.productsSubject.next(products));
  }
}
