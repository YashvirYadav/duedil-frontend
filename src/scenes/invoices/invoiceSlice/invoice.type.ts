
export interface IRegisterInvoiceResponce {
  statusCode: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  data: IInvoice[] | [];
  message: string;
  success: boolean;
  error: string | null;
  OCR :ocrinvoice;
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
  vendorname? : string;
  movementstatus?: string;
  requestdate?: Date;
 
  progressstepsdone: number;
  progressstepscount: number;
}

export interface ocrinvoice {
  tax_amount: string;
  total_amount : string;
  main_amount : string;
  invoice_number : string;
  invoice_eway : string;
  invoice_date : string;
}

export interface item 
  {
    _id: string;
    item: string;
    quantity: number;
    rate: string;
    amount: string;
  }


