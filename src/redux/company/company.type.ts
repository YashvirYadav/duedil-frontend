export interface IRegisterCompanyResponce {
    statusCode: number;
    data: ICompany;
    message: string;
    success: boolean;
    }

export interface ICompany{
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