import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequest, CreateRequestDto } from '../models/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  createRequest(requestData: CreateRequestDto): Observable<{ message: string; requestId: string }> {
    const formData = new FormData();

    if (requestData.firstName) formData.append('firstName', requestData.firstName);
    if (requestData.lastName) formData.append('lastName', requestData.lastName);
    if (requestData.companyName) formData.append('companyName', requestData.companyName);
    if (requestData.email) formData.append('email', requestData.email);
    if (requestData.phone) formData.append('phone', requestData.phone);

    formData.append('title', requestData.title);
    formData.append('service', requestData.service);
    formData.append('description', requestData.description);

    requestData.attachments.forEach(file => {
      formData.append('attachments', file);
    });

    return this.http.post<{ message: string; requestId: string }>(`${this.apiUrl}/api/requests`, formData);
  }

  getUserRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(`${this.apiUrl}/api/requests/my-requests`);
  }

  getRequestById(id: string): Observable<ServiceRequest> {
    return this.http.get<ServiceRequest>(`${this.apiUrl}/api/requests/${id}`);
  }

  makePayment(requestId: string): Observable<{ paymentUrl: string }> {
    return this.http.post<{ paymentUrl: string }>(`${this.apiUrl}/api/requests/${requestId}/payment`, {});
  }
}
