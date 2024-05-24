export interface IRegisterVendorResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IVendor[] | [];
    message: string;
    success: boolean;
    error: string | null;
    }

    export interface IVendor  {
        _id?: string;
        vendorname: string;
        code?: string;
        country?: string;
        state?: string;
        city?: string;
        address?: string;
        zip?: string;
        panno?: string;
        gstno?: string;
        cinno?: string;
        website?: string;
        isactive?: boolean | string;
        createdAt?: string;
        updatedAt?: string;
        adminname?: string;
        email: string;
        mobile?: string;
        paymentterms? : string;
        creditlimit? : string;
      };