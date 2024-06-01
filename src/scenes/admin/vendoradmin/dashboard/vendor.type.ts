export interface IVendorDashboardResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IVendorDashboard;
    message: string;
    success: boolean;
    error: string | null;
    }

    export interface IVendorDashboard {
        totalInvoice: number
        totalAmount: number,
        pendingInvoice: number,
        wipInvoice: number,
        paidInvoice: number,
        rejectedInvoice: number
    } 