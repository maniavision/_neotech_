import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestService } from '../../core/services/request.service';
import { AuthService } from '../../core/services/auth.service';
import { RequestStatus, ServiceRequest } from '../../core/models/interfaces';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private requestService = inject(RequestService);
  private authService = inject(AuthService);

  requests: ServiceRequest[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getUserRequests().subscribe({
      next: (requests) => {
        this.requests = requests;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading requests:', error);
        this.loading = false;
      }
    });
  }

  getPendingCount(): number {
    return this.requests.filter(r => r.status === RequestStatus.PENDING).length;
  }

  getInProgressCount(): number {
    return this.requests.filter(r => r.status === RequestStatus.IN_PROGRESS).length;
  }

  getCompletedCount(): number {
    return this.requests.filter(r => r.status === RequestStatus.COMPLETED).length;
  }

  viewRequest(requestId: string): void {
    // Navigate to request detail view
    // this.router.navigate(['/requests', requestId]);
  }

  makePayment(requestId: string, event: Event): void {
    event.stopPropagation();
    this.requestService.makePayment(requestId).subscribe({
      next: (response) => {
        window.open(response.paymentUrl, '_blank');
      },
      error: (error) => {
        console.error('Error initiating payment:', error);
        alert('Error processing payment. Please try again.');
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  truncateDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

  logout(): void {
    this.authService.logout();
    // Navigation will be handled by auth guard
  }
}
