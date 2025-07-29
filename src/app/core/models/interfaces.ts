export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    createdAt: Date;
  }
  
  export interface ServiceRequest {
    id: string;
    userId: string;
    title: string;
    service: ServiceType;
    description: string;
    status: RequestStatus;
    attachments: FileAttachment[];
    createdAt: Date;
    updatedAt: Date;
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
    CANCELLED = 'Cancelled'
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
  