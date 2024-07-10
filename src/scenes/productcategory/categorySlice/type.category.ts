//Category Name, Code, Description, Basic Rate(Drop Down-- Rs. 0-100, Rs. 101-500, Rs. 501-1000, Rs. 1001+ ) , Status
export interface IProductCategory {
  _id?: string;
  categoryproduct: string;
  productname: string;
  rate: number;
  status: boolean;
  minimumtat: number;
  maximumtat: number; 
}

export interface IRegisterCategoryResponce {
  statusCode: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  data: IProductCategory | [];
  message: string;
  success: boolean;
  error: string | null;
}
