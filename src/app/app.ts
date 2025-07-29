import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, Header, Footer],
  templateUrl: './app.html',
  animations: [
    // Route transition animation
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  private routeData = '';

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.routeData = event.urlAfterRedirects;
      });
  }

  getRouteAnimationData() {
    return this.routeData;
  }
}
