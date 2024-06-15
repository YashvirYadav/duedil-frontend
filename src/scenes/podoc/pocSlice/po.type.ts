import { ex } from "@fullcalendar/core/internal-common";

export interface IPOResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: any
    message: string;
    success: boolean;
    vendor: IVendor[];
    error: string | null;
    }

    export interface IVendor {
        _id? : string;
        vendorname : string;
    }