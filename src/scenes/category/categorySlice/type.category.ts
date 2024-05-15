//Category Name, Code, Description, Basic Rate(Drop Down-- Rs. 0-100, Rs. 101-500, Rs. 501-1000, Rs. 1001+ ) , Status
export interface ICategory {
    name: string;
    code: string;
    description: string;
    basicRate: string;
    status: string;
}

export interface IRegisterCategoryResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: ICategory | null;
    message: string;
    success: boolean;
    error: string | null;
    }