import axios, { AxiosPromise } from "axios";
import { IKeyValue } from "./Api.type";

const authToken = () => sessionStorage.getItem("token");
const defaltContentType = "application/json";

const makeHeader = (
  header: IKeyValue<string | number | boolean>,
  contentType?: string | null,
  responce?: "blob" | undefined,
  callbackfunction?: Function
) => {
  const defatHeader = {
    Authorization: `Bearer ${authToken()}`,
    "Content-Type": contentType ? contentType : defaltContentType,
  };

  if (callbackfunction) {
    return {
      header: { ...defatHeader, ...header },
      responce,
      onUploadProgress: (data: any) => {
        callbackfunction?.(Math.round((100 * data.loaded) / data.total) + 1);
      },
    };
  } else {
    return { header: { ...defatHeader, ...header }, responce };
  }
};

const baseURL = "http://localhost:8000/api/v1/";

export const service = {
  getCAll: (
    url: string,
    header: IKeyValue<string | number | boolean> = {},
    responce?: "blob"
  ): AxiosPromise => {
    return axios.get(baseURL + url, makeHeader(header, null, responce));
  },

  postCall: (
    url: string,
    body: IKeyValue<any> = {},
    header: IKeyValue<string | number | boolean> = {},
    responce?: "blob",
    callbackfunction?: Function
  ): AxiosPromise => {
    return axios.post(
      baseURL + url,
      body,
      makeHeader(header, null, responce, callbackfunction)
    );
  },
};
