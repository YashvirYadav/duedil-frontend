export interface IClientAdminResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string;
    success: boolean;
    data: IInvoice[] ;
    error: string | null;
    dashboard: dashboard;
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

  export interface dashboard{
    totalInvoicecount : number;
    totalAmount : number;
    newandwipInvoicecount : number;
    newandwipAmount : number;
    rejectedInvoicecount : number;
    rejectedAmount : number;
    paidInvoicecount : number;
    paidAmount  : number;


  }
 

 