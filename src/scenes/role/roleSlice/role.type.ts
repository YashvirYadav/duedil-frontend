export interface IRegisterRoleResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IRole[] | [];
    message: string;
    success: boolean;
    error: string | null;
    }

export interface IRole  {
    _id?: string;
    rolename: string;
    description?: string;
    roletype?: string;
    isactive: boolean;
    companyId?: string;
  };