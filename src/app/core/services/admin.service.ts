import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequest, UpdateRequestDto, User } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getAllRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>('/api/admin/requests');
  }

  updateRequest(requestId: string, updateData: UpdateRequestDto): Observable<ServiceRequest> {
    return this.http.put<ServiceRequest>(`/api/admin/requests/${requestId}`, updateData);
  }

  deleteRequest(requestId: string): Observable<void> {
    return this.http.delete<void>(`/api/admin/requests/${requestId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/admin/users');
  }

  getRequestsByStatus(status: string): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(`/api/admin/requests/status/${status}`);
  }

  getAnalytics(): Observable<any> {
    return this.http.get<any>('/api/admin/analytics');
  }
}
