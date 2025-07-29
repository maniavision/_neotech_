import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-confirm',
  imports: [CommonModule, RouterModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss'
})
export class Confirm {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = true;
  success = false;
  errorMessage = '';

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    
    if (token) {
      this.authService.confirmEmail(token).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
        },
        error: (error) => {
          this.success = false;
          this.errorMessage = 'Invalid or expired confirmation token.';
          this.loading = false;
        }
      });
    } else {
      this.success = false;
      this.errorMessage = 'No confirmation token provided.';
      this.loading = false;
    }
  }
}
