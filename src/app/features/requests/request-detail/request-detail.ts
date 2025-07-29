import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RequestService } from '../../../core/services/request.service';
import { ServiceRequest } from '../../../core/models/interfaces';

@Component({
  selector: 'app-request-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './request-detail.html',
  styleUrl: './request-detail.scss'
})
export class RequestDetail {
  private route = inject(ActivatedRoute);
  private requestService = inject(RequestService);

  request: ServiceRequest | null = null;
  loading = true;

  ngOnInit(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (requestId) {
      this.loadRequest(requestId);
    }
  }

  loadRequest(id: string): void {
    this.requestService.getRequestById(id).subscribe({
      next: (request) => {
        this.request = request;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading request:', error);
        this.loading = false;
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  makePayment(): void {
    if (this.request) {
      this.requestService.makePayment(this.request.id).subscribe({
        next: (response) => {
          window.open(response.paymentUrl, '_blank');
        },
        error: (error) => {
          console.error('Error initiating payment:', error);
          alert('Error processing payment. Please try again.');
        }
      });
    }
  }
}
