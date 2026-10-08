export type UserRole = 'admin' | 'vendor' | 'dept_admin';
export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  companyName?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  isActive?: boolean;
  gstNumber?: string;
  gstin?: string;
  contactPerson?: string;
  website?: string;
  licenseUrl?: string;
  licenseName?: string;
  department?: string;
  photoUrl?: string;
  pan?: string;
  cin?: string;
  tan?: string;
  category?: string;
  updatedAt?: string;
}

export type TenderStatus = 'draft' | 'review' | 'published' | 'evaluation' | 'awarded' | 'closed' | 'completed' | 'rejected';

export interface TenderDocument {
  name: string;
  url: string;
  type: string;
}

export interface TenderCompletionProof {
  remarks: string;
  submittedAt: string;
  documents: TenderDocument[];
}

export interface TenderCompletionReview {
  status: 'approved' | 'rejected';
  remarks: string;
  reviewedAt: string;
  reviewedBy: string;
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  refNumber: string;
  status: TenderStatus;
  budget: number;
  publishDate: string;
  closingDate: string;
  workflowStage: number;
  category?: string;
  department: string;
  documents: TenderDocument[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completionProof?: TenderCompletionProof;
  completionReview?: TenderCompletionReview;
  awardedToCompany?: string;
  awardedToBidderId?: string;
  emdAmount?: number;
  bidOpeningDate?: string;
  contractAmount?: number;
  paymentMilestones?: {
    id: string;
    name: string;
    percentage: number;
    amount: number;
    estDate: string;
    status: 'pending' | 'released';
    releaseDate?: string;
  }[];
  inspectionReports?: {
    id: string;
    milestoneId?: string;
    remarks: string;
    inspector: string;
    status: 'approved' | 'pending';
    date: string;
  }[];
  releasedBudget?: number;
  completionRemarks?: string;
}

export type BidStatus = 'submitted' | 'opened' | 'shortlisted' | 'selected' | 'rejected';

export interface Bid {
  id: string;
  tenderId: string;
  bidderId: string;
  technicalQuote: string;
  financialQuote: number;
  status: BidStatus;
  submittedAt: string;
  documents: TenderDocument[];
  rejectionReason?: string;
  selectionReason?: string;
  technicalScore?: number;
  complianceChecklist?: Record<string, boolean>;
  evaluationRemarks?: string;
  financialScore?: number;
  finalRank?: number;
}

export interface Notification {
  id: string;
  userId: string;
  title?: string;
  message: string;
  read: boolean;
  createdAt: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface AuditLog {
  id: string;
  actionType: string;
  title: string;
  description: string;
  performedBy: string;
  entityType: string;
  entityReference: string;
  previousValue?: string;
  newValue?: string;
  remarks?: string;
  ipAddress?: string;
  module?: string;
  timestamp: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

