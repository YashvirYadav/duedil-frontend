export interface INeedtoactResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IInvoice[] | IInvoice;
    currentInvoice: IInvoice | null;
    message: string;
    success: boolean;
    error: string | null;
    pdfUrl: File | null;
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