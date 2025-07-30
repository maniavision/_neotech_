import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserRole } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.getCurrentUser().subscribe();
    }
  }

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>('/api/auth/login', { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('auth_token', response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/auth/me')
      .pipe(
        tap(user => this.currentUserSubject.next(user))
      );
  }

  confirmEmail(token: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/api/auth/confirm', { token });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === UserRole.ADMIN;
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
