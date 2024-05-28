export interface IRegisterWorkflowResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IWorkflow[] | [];
    message: string;
    success: boolean;
    error: string | null;
    }

    export interface IWorkflow  {
        _id?: string;
        rolename?: string;
        roletype?: string;
        departmentname?: string;
        minamount?: string;
        maxamount?: string;
        tat:string
        companyId?: string;
      };