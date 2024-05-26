
export interface IRegisterInvoiceResponce {
  statusCode: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  data: IInvoice[] | [];
  message: string;
  success: boolean;
  error: string | null;
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
}
