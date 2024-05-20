import { ICategory } from "../../category/categorySlice/type.category";

export interface IRegisterCompanyResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IGetCompany[] | [];
    message: string;
    success: boolean;
    error: string | null;
    }



export interface ICompany{
    _id? : string;
    CompanyName : string;
    code : string;
    logo : string;
    Country : string;
    State : string;
    City : string;
    Address : string;
    ZIP : string;
    PanNo : string;
    GSTNo : string;
    CinNo : string;
    Website : string;
    AdminName : string;
    Email : string;
    Mobile : string;
    Domain : string;
    Description : string;
    Status : boolean;
}

export interface IGetCompany  {
    _id?: string;
    companyname: string;
    code: string;
    logo: string;
    country: string;
    state: string;
    city: string;
    address: string;
    zip: string;
    panno: string;
    gstno: string;
    cinno: string;
    website: string;
    isactive: boolean;
    createdAt: string;
    updatedAt: string;
    category: ICategory[];
    adminname: string;
    email: string;
    mobile: string;
  };