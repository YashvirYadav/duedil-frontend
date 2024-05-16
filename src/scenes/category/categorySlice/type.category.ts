//Category Name, Code, Description, Basic Rate(Drop Down-- Rs. 0-100, Rs. 101-500, Rs. 501-1000, Rs. 1001+ ) , Status
export interface ICategory {
  _id?: string;
  name: string;
  code: string;
  description: string;
  status: string;
  c0to100: number;
  c101to500: number;
  c501to1000: number;
  c1001plus: number;
}

export interface IRegisterCategoryResponce {
  statusCode: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  data: ICategory | [];
  message: string;
  success: boolean;
  error: string | null;
}
