import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-navbar',
  imports: [NgClass,NgbCollapseModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
   private platformId = inject(PLATFORM_ID);
  private router = inject(Router); // Inyecta Router
  cartService = inject(CartService);
  isScrolled = false;
  isMenuCollapsed = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  // Método para cerrar el menú al navegar
  closeMenu() {
    if (!this.isMenuCollapsed) {
      this.isMenuCollapsed = true;
    }
  }

  // Método para cerrar menú al hacer clic en enlace
  onNavLinkClick() {
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 992) {
      this.closeMenu();
    }
  }
}
