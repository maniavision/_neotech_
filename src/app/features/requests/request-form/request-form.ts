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

  requestForm: FormGroup;
  selectedFiles: File[] = [];
  isSubmitting = false;
  isLoggedIn = false;
  serviceTypes = Object.values(ServiceType);

  constructor() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.requestForm = this.createForm();
  }

  private createForm(): FormGroup {
    const baseControls = {
      description: ['', Validators.required]
    };

    if (!this.isLoggedIn) {
      return this.fb.group({
        ...baseControls,
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        title: ['', Validators.required],
        service: ['', Validators.required]
      });
    }

    return this.fb.group(baseControls);
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
          alert('Request submitted successfully! Please check your email for confirmation.');
          if (this.isLoggedIn) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Error submitting request:', error);
          alert('Error submitting request. Please try again.');
          this.isSubmitting = false;
        }
      });
    }
  }
}
