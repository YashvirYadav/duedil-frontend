
export interface IPOResponce {
  statusCode: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  data: IPO[] | IPO | any;
  message: string;
  success: boolean;
  vendor: IVendor[];
  error: string | null;
}

export interface IPO {
  _id?: string;
  venderid: string;
  ponumber: number;
  podate: string;
  poexpirydate: string;
  povalue: number;
  consumeamout: number;
  openamout: number;
  history: any[];
  isactive: boolean;
  ponature: string;
  attachment: string;
}

export interface IVendor {
  _id?: string;
  vendorname: string;
}
