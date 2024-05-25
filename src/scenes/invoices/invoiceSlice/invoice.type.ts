import { da } from "@fullcalendar/core/internal-common";

export interface IRegisterInvoiceResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IInvoice[] | [];
    message: string;
    success: boolean;
    error: string | null;
    }

    export interface IInvoice  {
        _id?: string;
        invoicenumber: string;
        invoicedate?: Date;
        duedate?: Date;
        vendorname: string;
        vendorcontactinfo?: string;
        amount: number;
        currency: string;
        description: string;
        purchaseordernumber?: string;
        gstnumber?: string;
        notes?: string;
        attachments?: string;
        vendorId?: string;
    }