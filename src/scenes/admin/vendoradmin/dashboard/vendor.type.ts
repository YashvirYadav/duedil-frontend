import { IInvoice } from "../../executive/needtoact/needtoact.type";

export interface IVendorDashboardResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IVendorDashboard;
    message: string;
    success: boolean;
    error: string | null;
    invoice : IInvoice[]
    }

    
    export interface IVendorDashboard {
        totalInvoice: number
        totalAmount: number,
        
        newInvoice: number,
        newInvoiceAmount: number,

        rejectedInvoice: number,
        rejectedInvoiceAmount: number,
        

        wipInvoice: number,
        wipInvoiceAmount: number

        paidInvoice: number,
        paidInvoiceAmount: number
    } 