
export interface IRegisterInvoiceResponce {
  statusCode: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  data: IInvoice[] | [];
  message: string;
  success: boolean;
  error: string | null;
}

export interface IInvoice {
  invoiceId: string;
  invoiceNumber: string;
  dateIssued: string;
  dueDate: string;
  status: string;
  totalAmount: number;
  currency?: string;
  customer: ICustomer;
  items: IItem[];
  paymentDetails: IPaymentDetail[];
}

export interface ICustomer {
  customerId: string;
  name: string;
  email: string;
  address: IAddress;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IItem {
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IPaymentDetail {
  paymentId: string;
  paymentDate: string;
  paymentMethod: string;
  paymentAmount: number;
}
