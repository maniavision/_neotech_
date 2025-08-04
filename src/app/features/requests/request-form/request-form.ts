import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../../core/services/request.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ServiceType } from '../../../core/models/interfaces';
import { FileUpload } from '../../../shared/components/file-upload/file-upload';

@Component({
  selector: 'app-request-form',
  imports: [CommonModule, ReactiveFormsModule, FileUpload],
  templateUrl: './request-form.html',
  styleUrl: './request-form.scss'
})
export class RequestForm {
  private fb = inject(FormBuilder);
  private requestService = inject(RequestService);
  private authService = inject(AuthService);
  private router = inject(Router);

  showSuccessModal = false;
  successMessage = '';

  requestForm: FormGroup;
  selectedFiles: File[] = [];
  isSubmitting = false;
  isLoggedIn = false;
  serviceTypes = Object.entries(ServiceType).map(([key, value]) => ({ key, value }));

  constructor() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.requestForm = this.createForm();
  }

private createForm(): FormGroup {
  const baseControls = {
    title: ['', Validators.required],
    service: ['', Validators.required],
    description: ['', Validators.required],
  };

  if (this.isLoggedIn) {
    return this.fb.group(baseControls);
  }

  return this.fb.group({
    ...baseControls,
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });
}

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.isSubmitting = true;

      const formData = {
        ...this.requestForm.value,
        attachments: this.selectedFiles
      };

      this.requestService.createRequest(formData).subscribe({
        next: (response) => {
          if (this.isLoggedIn) {
            this.successMessage = 'Request submitted successfully! Redirecting to dashboard...';
            this.showSuccessModal = true;
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 5000);
          } else {
            this.successMessage = 'Request submitted successfully! A confirmation link has been sent to your email. Redirecting to home page...';
            this.showSuccessModal = true;
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
          }
        },
        error: (error) => {
          console.error('Error submitting request:', error);
          // alert('Error submitting request. Please try again.');
          this.isSubmitting = false;
        }
      });
    }
  }
}
