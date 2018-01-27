import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { FiltersComponent } from './component/filters/filters.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './services/products.service';
import { FiltersService } from './services/filters.service';
import { BodyComponent } from './component/body/body.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FiltersComponent,
    ProductsComponent,
    BodyComponent,
    HeaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProductsService,
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
