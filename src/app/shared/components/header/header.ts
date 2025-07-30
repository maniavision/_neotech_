import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { TranslateModule } from '@ngx-translate/core';
import { UserRole } from '../../../core/models/interfaces';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, TranslateModule, LanguageSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = false;
  mobileMenuOpen = false;
  isScrolled = false;
  isAdmin = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 768) {
      this.mobileMenuOpen = false;
    }
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.role === UserRole.ADMIN;
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/']);
  }
}
