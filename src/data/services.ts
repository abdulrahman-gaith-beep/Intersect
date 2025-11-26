export interface Service {
  id: number;
  title: string;
  type: 'automated' | 'advisory';
  status: 'available' | 'locked' | 'in-progress' | 'completed';
  description: string;
  icon?: string;
}

export const services: Service[] = [
  { 
    id: 1, 
    title: "MISA License Pre-Check", 
    type: "automated", 
    status: "available",
    description: "Instant analysis of your eligibility for 100% foreign ownership."
  },
  { 
    id: 2, 
    title: "Government Deal Scouting", 
    type: "advisory", 
    status: "locked",
    description: "Our GR team scouts contracts within Giga-projects (NEOM, Red Sea)."
  },
  { 
    id: 3, 
    title: "Commercial Registration (CR)", 
    type: "automated", 
    status: "in-progress",
    description: "Direct connection to Ministry of Commerce API."
  },
  {
    id: 4,
    title: "Market Intelligence Report",
    type: "automated",
    status: "available",
    description: "AI-powered market analysis with competitor insights and trends."
  },
  {
    id: 5,
    title: "Legal Entity Structuring",
    type: "advisory",
    status: "available",
    description: "Expert consultation on optimal legal structure for your operations."
  },
  {
    id: 6,
    title: "Name Reservation",
    type: "automated",
    status: "available",
    description: "Reserve your company name with Ministry of Commerce instantly."
  },
  {
    id: 7,
    title: "Gov Negotiation Support",
    type: "advisory",
    status: "locked",
    description: "Strategic support for government contract negotiations."
  },
  {
    id: 8,
    title: "Bank Account Setup",
    type: "advisory",
    status: "available",
    description: "Assistance with corporate bank account opening in Saudi Arabia."
  }
];

export interface ActionItem {
  id: number;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export const actionItems: ActionItem[] = [
  {
    id: 1,
    title: "Upload Articles of Association",
    dueDate: "2024-01-15",
    priority: "high",
    completed: false
  },
  {
    id: 2,
    title: "Complete MISA Application Form",
    dueDate: "2024-01-20",
    priority: "high",
    completed: false
  },
  {
    id: 3,
    title: "Provide Financial Statements",
    dueDate: "2024-01-25",
    priority: "medium",
    completed: true
  },
  {
    id: 4,
    title: "Schedule Compliance Review Call",
    dueDate: "2024-01-30",
    priority: "low",
    completed: false
  }
];

export interface ProgressStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

export const progressSteps: ProgressStep[] = [
  {
    id: 1,
    title: "Registration",
    description: "Company documentation and initial setup",
    status: "completed"
  },
  {
    id: 2,
    title: "Compliance",
    description: "Regulatory requirements and approvals",
    status: "current"
  },
  {
    id: 3,
    title: "Deal Origination",
    description: "Market connections and opportunities",
    status: "pending"
  },
  {
    id: 4,
    title: "JV Formation",
    description: "Joint venture structuring and finalization",
    status: "pending"
  }
];

export interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  folder: 'Legal' | 'Financials' | 'Strategy';
}

export const documents: Document[] = [
  {
    id: 1,
    name: "Articles of Association.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: "2024-01-10",
    folder: "Legal"
  },
  {
    id: 2,
    name: "Board Resolution.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadedAt: "2024-01-09",
    folder: "Legal"
  },
  {
    id: 3,
    name: "Q4 Financial Report.xlsx",
    type: "xlsx",
    size: "3.1 MB",
    uploadedAt: "2024-01-08",
    folder: "Financials"
  },
  {
    id: 4,
    name: "Market Entry Strategy.pptx",
    type: "pptx",
    size: "8.5 MB",
    uploadedAt: "2024-01-07",
    folder: "Strategy"
  },
  {
    id: 5,
    name: "Compliance Checklist.pdf",
    type: "pdf",
    size: "0.8 MB",
    uploadedAt: "2024-01-06",
    folder: "Legal"
  }
];
