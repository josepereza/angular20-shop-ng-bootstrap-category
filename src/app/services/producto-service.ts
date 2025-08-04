import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl="https://fakestoreapi.com/products"
  private http = inject(HttpClient);
  // Señales reactivas
  private _products = signal<Product[]>([]);
  private _categories = signal<string[]>([]);
  selectedCategory = signal<string | null>(null);

  // Productos filtrados por categoría
  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    if (!category) return this._products();
    return this._products().filter(p => p.category === category);
  });

  constructor() {
    this.loadProducts();
    this.loadCategories();
  }

  // Cargar todos los productos
  private loadProducts() {
    this.http.get<Product[]>(`${this.apiUrl}`)
      .subscribe({
        next: (products) => this._products.set(products),
        error: (err) => console.error('Error loading products:', err)
      });
  }

  // Cargar categorías desde la API específica
  private loadCategories() {
    this.http.get<string[]>(`${this.apiUrl}/categories`)
      .subscribe({
        next: (categories) => this._categories.set(categories),
        error: (err) => console.error('Error loading categories:', err)
      });
  }

  // Getter para categorías (readonly)
  get categories() {
    return this._categories.asReadonly();
  }

  // Cambiar categoría seleccionada
  setCategory(category: string | null) {
    this.selectedCategory.set(category);
  }

  // Obtener productos por categoría (opcional)
  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
}
