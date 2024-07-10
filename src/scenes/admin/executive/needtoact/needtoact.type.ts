export interface INeedtoactResponce {
    statusCode: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    data: IInvoice[] | IInvoice;
    currentInvoice: IInvoice | null;
    message: string;
    success: boolean;
    error: string | null;
    pdfUrl: File | null;
  }
  
  export interface IInvoice {
    _id?: string;
    productcategory:string;
    concentdoc : string;
    biodata : string;
    clientid :string;
    clientname : string;
   
    productrequest :Iproductrequest[]
    workflowemovement?: Iinvoicemovement[];
    movementstatus: string;
     requestdate?: Date;
     duedate?: Date;
     progressstepsdone: number;
     progressstepscount: number;
  }

  export interface Iproductrequest{
    productname :string
    finaldocument : string
    remark : string[]
    status : string
    duedate: Date
    maximumtat: number
    _id : string 
  }

  export interface Iinvoicemovement {
    sequence: number;
    userId: string;
    username: string;
    role: string;
    tat: number;
    indate: Date;
    outdate: Date;
    atat: number;
    status: string;
    _id: string;
    }


