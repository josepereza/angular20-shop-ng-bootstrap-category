import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/producto-service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  imports: [TitleCasePipe],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css'
})
export class CategoryFilter {
    productService = inject(ProductService);


}
