export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    createdAt: Date;
    role: UserRole;
  }
  
  export interface ServiceRequest {
    id: string;
    userId: string;
    userName: string; // Add user name for admin view
    userEmail: string; // Add user email for admin view
    title: string;
    service: ServiceType;
    description: string;
    status: RequestStatus;
    attachments: FileAttachment[];
    createdAt: Date;
    updatedAt: Date;
    adminNotes?: string; // Add admin notes
  }
  
  export interface FileAttachment {
    id: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    url: string;
  }
  
  export enum ServiceType {
    WEB_DEVELOPMENT = 'Web Development',
    DATA_MANAGEMENT = 'Data Management',
    ETL_PROCESS = 'ETL Process',
    CLOUD_HOSTING = 'Cloud Hosting',
    CUSTOM_INQUIRY = 'Custom Inquiry'
  }
  
  export enum RequestStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
    ON_HOLD = 'On Hold'
  }
  
  export interface CreateRequestDto {
    name?: string;
    email?: string;
    phone?: string;
    title: string;
    service: ServiceType;
    description: string;
    attachments: File[];
  }
  
  export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
  }

  export interface UpdateRequestDto {
    status?: RequestStatus;
    adminNotes?: string;
  }