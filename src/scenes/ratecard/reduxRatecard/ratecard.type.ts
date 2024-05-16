export interface IRateCard {
    name: string;
    code: string;
    description: string;
    basicRate: string;
    status: string;
}

export interface IRegisterRateCardResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IRateCard | null;
    message: string;
    success: boolean;
    error: string | null;
    }