import { IRole } from "../../role/roleSlice/role.type";

export interface ILoginSuccessResponce {
  statusCode: number;
  data: IData;
  dashboard: IUserDashboard;
  message: string;
  success: boolean;
}

export interface IData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  userrole: string;
  comapanyId: string;
  role?: IRole;
  vendorId?: string | undefined;
  __v: number;
  watchHistory: any[]; // Replace 'any' with the actual type if you know it
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
  userrole: string;
  status: boolean;
  mobile: string;
  role?: IRole;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUserDashboard {
  needtoact: number;
  needtoacttotal: number;

  invoiceWip: number;
  invoiceWipAmount: number;

  invoiceCompleted: number;
  invoiceCompletedAmount: number;

  invoiceRejected: number;
  invoiceRejectedAmount: number;
}
