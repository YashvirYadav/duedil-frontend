export interface IClientAdminResponce {
  statusCode: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  message: string;
  success: boolean;
  data: IInvoice[];
  error: string | null;
  dashboard: dashboard;
  chartdata: Ichartdata[];
  sla: IInvoice[];
  searchDashboardBydate: Iserchdashboard ;
  Pendinginvoice: IPendinginvoice[];
  AagingReports: IagingReports[];
}

export interface IInvoice {
  _id?: string;
  invoicenumber: string;
  invoicedate?: Date;
  duedate?: Date;
  amount: number;
  purchaseordernumber?: string;
  gstamount?: string | number;
  attachments?: string;
  totalamount?: number;
  vendorId?: string;
  vendorname?: string;
  invoicemovement?: Iinvoicemovement[];
}

export interface Ichartdata {
  x: string;
  y: number;
}

export interface Iinvoicemovement {
  sequence: number;
  userId: string;
  username: string;
  role: string;
  tat: number;
  indate: Date;
  outdate: Date;
  atat: number;
  status: string;
  _id: string;
}

export interface dashboard {
  totalInvoicecount: number;
  totalAmount: number;
  newandwipInvoicecount: number;
  newandwipAmount: number;
  rejectedInvoicecount: number;
  rejectedAmount: number;
  paidInvoicecount: number;
  paidAmount: number;
}

export interface Iserchdashboard {
  totalInvoicecount: number;
  totalAmount: number;
  newandwipInvoicecount: number;
  newandwipAmount: number;
  rejectedInvoicecount: number;
  rejectedAmount: number;
  paidInvoicecount: number;
  paidAmount: number;
  lineData: ILineData[];
}

export interface ILineData {
  data: Ichartdata[];
  id: string;
  color: string;
}


export interface IPendinginvoice{
  vendorname: string;
  VHD: number;
  Approver: number;
  GRN: number;
  Reviewer: number;
  Finance: number;
  API: number;
  Paid: number;
  total: number;
} 
// "vendorname": "oswal clothing supplier",
// "invoices0to30": 1,
// "invoices31to60": 0,
// "invoices61to90": 0,
// "invoices91to120": 0,
// "invoices121next": 0
export interface IagingReports{
  vendorname: string;
  invoices0to30: number;
  invoices31to60: number;
  invoices61to90: number;
  invoices91to120: number;
  invoices121next: number;
} 