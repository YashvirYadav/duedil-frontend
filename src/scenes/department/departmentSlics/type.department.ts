export interface IRegisterDepartmentResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IDepartment[] | [];
    message: string;
    success: boolean;
    error: string | null;
    }

    export interface IDepartment  {
        _id?: string;
        departmentname: string;
        code?: string;
        description?: string;
        eta?: string;
        isactive?: boolean | string;
      };