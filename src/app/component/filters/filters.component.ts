import { Component, OnInit } from '@angular/core';

import { FiltersService } from '../../services/filters.service';
import { Filter } from '../../models/interface';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {

  filter: Filter[] = [];
  filterCategories: Filter[] = [];
  filterPrices: Filter[] = [];
  filterStocks: Filter[] = [];
  indexFilter: any;

  constructor(private filtersService: FiltersService, private productService: ProductsService) { }

  ngOnInit() {
    this.getFilterCategories();
    this.getFilterPrices();
    this.getFilterStocks();
  }

  getFilterPrices() {
    this.filterPrices.push({ id: 1, name: '< $10.000', type: 'price' });
    this.filterPrices.push({ id: 2, name: '> $30.000', type: 'price' });
  }

  getFilterCategories() {
    this.filtersService.getCategories().subscribe(((data: any[]) => {
      this.filterCategories = data.map((item: any) => {
        item.type = 'category';
        return item;
      });
    }));
  }

  getFilterStocks() {
    this.filterStocks.push({ id: 1, name: 'Agotados', type: 'stock' });
    this.filterStocks.push({ id: 2, name: 'Disponibles', type: 'stock' });
    this.filterStocks.push({ id: 3, name: 'vendidos', type: 'stock' });
  }

  addFilters(filters: Filter) {
    this.indexFilter = null;
    this.filter.push({ id: filters.id, name: filters.name, type: filters.type });

    if (filters.type === 'category') {
      this.indexFilter = this.filterCategories.findIndex(category => category.id === filters.id);
      this.filterCategories.splice(this.indexFilter, 1);
    }

    if (filters.type === 'price') {
      this.indexFilter = this.filterPrices.findIndex(price => price.id === filters.id);
      this.filterPrices = [];
    }

    if (filters.type === 'stock') {
      if (filters.id === 1 || filters.id === 2) {
        this.filterStocks.splice(this.filterStocks.findIndex(price => price.id === 1), 1);
        this.filterStocks.splice(this.filterStocks.findIndex(price => price.id === 2), 1);

      }
      if (filters.id === 3) {
        this.indexFilter = this.filterStocks.findIndex(price => price.id === filters.id);
        this.filterStocks.splice(this.indexFilter, 1);
      }

    }

    this.productService.getProductsFilter(this.filter);
  }

  deleteFilter(filters: Filter) {
    this.indexFilter = null;
    this.indexFilter = this.filter.findIndex(filter => filter.id === filters.id && filter.type === filters.type);
    this.filter.splice(this.indexFilter, 1);

    if (filters.type === 'category') {
      this.filterCategories.push({ id: filters.id, name: filters.name, type: 'category' });
    }

    if (filters.type === 'price') {
      this.getFilterPrices();
    }

    if (filters.type === 'stock') {
      if (filters.id === 1 || filters.id === 2) {
        this.filterStocks.push({ id: 1, name: 'Agotados', type: 'stock' });
        this.filterStocks.push({ id: 2, name: 'Disponibles', type: 'stock' });
      }
      if (filters.id === 3) {
        this.filterStocks.push({ id: filters.id, name: filters.name, type: 'stock' });
      }
    }
  }
}
