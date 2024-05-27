export interface IRegisterBankResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IBank[] | [];
    message: string;
    success: boolean;
    error: string | null;
    }

export interface IBank {
    _id?: string;
    owner: string;
    name: string;
    branch: string;
    ifsc_code: string;
    accountnumber: string;
    userId?: string;
    isactive: boolean;
}