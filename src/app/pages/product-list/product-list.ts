import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/producto-service';
import { ProductCard } from '../../components/product-card/product-card';
import { CategoryFilter } from '../../components/category-filter/category-filter';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, CategoryFilter],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  productService = inject(ProductService);
  //products = this.productService.getProductsRs();

}
