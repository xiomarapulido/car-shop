import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';

@Injectable()
export class FiltersService {

  constructor(private http: HttpClient) { }

  categoriesObservable: Observable<any>;

  getCategories() {
    return this.categoriesObservable = this.http.get('/assets/json/data.json')
      .map((data: any) => data.categories);
  }

}

