import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, Header, Footer],
  templateUrl: './app.html',
  animations: [
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
  private translationService = inject(TranslationService);
  private routeData = '';

  ngOnInit(): void {
    // Initialize translation service (this will set up the translations)
    this.translationService;
    
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
