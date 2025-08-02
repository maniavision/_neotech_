import { Component, inject } from '@angular/core';
import { RequestStatus, ServiceRequest, ServiceType, UpdateRequestDto } from '../../core/models/interfaces';
import { AdminService } from '../../core/services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
  private adminService = inject(AdminService);

  // Make enums available in template
  RequestStatus = RequestStatus;
  ServiceType = ServiceType;

  requests: ServiceRequest[] = [];
  filteredRequests: ServiceRequest[] = [];
  loading = true;
  saving = false;

  // Filters - properly typed
  selectedStatus: RequestStatus | '' = '';
  selectedService: ServiceType | '' = '';
  searchTerm = '';

  // Editing - properly typed
  editingRequest: ServiceRequest | null = null;
  showModal = false;
  editForm: { status: RequestStatus; adminNotes: string } = {
    status: RequestStatus.PENDING,
    adminNotes: ''
  };

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.adminService.getAllRequests().subscribe({
      next: (requests) => {
        this.requests = requests;
        this.filteredRequests = requests;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading requests:', error);
        this.loading = false;
      }
    });
  }

  refreshData(): void {
    this.loadRequests();
  }

  filterRequests(): void {
    this.filteredRequests = this.requests.filter(request => {
      const statusMatch = !this.selectedStatus || request.status === this.selectedStatus;
      const serviceMatch = !this.selectedService || request.service === this.selectedService;
      const searchTermLower = this.searchTerm.toLowerCase();
      const searchMatch = !this.searchTerm ||
        (request.firstName && request.firstName.toLowerCase().includes(searchTermLower)) ||
        (request.lastName && request.lastName.toLowerCase().includes(searchTermLower)) ||
        (request.companyName && request.companyName.toLowerCase().includes(searchTermLower)) ||
        request.userEmail.toLowerCase().includes(searchTermLower) ||
        request.title.toLowerCase().includes(searchTermLower);

      return statusMatch && serviceMatch && searchMatch;
    });
  }

  getRequestsByStatus(status: RequestStatus): ServiceRequest[] {
    return this.requests.filter(request => request.status === status);
  }

  startEdit(request: ServiceRequest): void {
    this.editingRequest = request;
    this.editForm = {
      status: request.status as RequestStatus,
      adminNotes: request.adminNotes || ''
    };
    this.showModal = true;
  }

  saveEdit(): void {
    if (!this.editingRequest) return;

    this.saving = true;

    // Create properly typed update object
    const updateData: UpdateRequestDto = {
      status: this.editForm.status,
      adminNotes: this.editForm.adminNotes
    };

    this.adminService.updateRequest(this.editingRequest.id, updateData).subscribe({
      next: (updatedRequest) => {
        const index = this.requests.findIndex(r => r.id === updatedRequest.id);
        if (index !== -1) {
          this.requests[index] = updatedRequest;
          this.filterRequests();
        }
        this.cancelEdit();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error updating request:', error);
        alert('Error updating request. Please try again.');
        this.saving = false;
      }
    });
  }

  cancelEdit(): void {
    this.editingRequest = null;
    this.showModal = false;
    this.editForm = {
      status: RequestStatus.PENDING,
      adminNotes: ''
    };
  }

  closeModal(): void {
    this.cancelEdit();
  }

  viewRequest(request: ServiceRequest): void {
    // Implement view request details
    console.log('View request:', request);
  }

  trackByRequestId(index: number, request: ServiceRequest): string {
    return request.id;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDateTime(date: Date): string {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  truncateDescription(description: string): string {
    return description.length > 60 ? description.substring(0, 60) + '...' : description;
  }
}
