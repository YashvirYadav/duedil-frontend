import axios, { AxiosPromise } from "axios";
import { IKeyValue } from "./Api.type";

const authToken = () => sessionStorage.getItem("token");
const defaultContentType = "application/json";
// const LocbaseURL = "http://localhost:8000/api/v1/";
const LivebaseURL = "http://45.64.8.186:8000/api/v1/";

const baseURL = LivebaseURL

const makeHeader = (
  header: IKeyValue<string | number | boolean> = {},
  contentType: string | null = defaultContentType,
  response: "blob" | undefined = undefined,
  callbackfunction?: Function
) => {
  const defaultHeader = {
    Authorization: `Bearer ${authToken()}`,
    "Content-Type": contentType? contentType : defaultContentType,
    ...header
  };

  const config = {
    headers: defaultHeader,
    responseType: response,
    onUploadProgress: (data: any) => {
      callbackfunction?.(Math.round((100 * data.loaded) / data.total) + 1);
    },
  };

  return config;
};


export const service = {
  getCall : (
  url: string,
  header: IKeyValue<string | number | boolean> = {},
  response: "blob" | undefined = undefined
): AxiosPromise => {
  return axios.get(baseURL+url, makeHeader(header, defaultContentType, response));
},

  postCall : (
  url: string,
  body: IKeyValue<any> = {},
  header: IKeyValue<string | number | boolean> = {},
  response: "blob" | undefined = undefined,
  callbackfunction?: Function
): AxiosPromise => {
  return axios.post(baseURL + url, body, makeHeader(header, defaultContentType, response, callbackfunction));
},
postCallBlob : (
  url: string,
  body: IKeyValue<any> = {},
  header: IKeyValue<string | number | boolean> = {},
  response: "blob" | undefined = undefined,
  callbackfunction?: Function
): AxiosPromise => {
  return axios.post(baseURL + url, body, makeHeader(header, 'blob', response, callbackfunction));
},
// put call
putCall : (
  url: string,
  body: IKeyValue<any> = {},
  header: IKeyValue<string | number | boolean> = {},
  response: "blob" | undefined = undefined
): AxiosPromise => {
  return axios.put(baseURL + url, body, makeHeader(header, defaultContentType, response));
},
// delete call
deleteCall : (
  url: string,
  header: IKeyValue<string | number | boolean> = {},
  response: "blob" | undefined = undefined
): AxiosPromise => {
  return axios.delete(baseURL + url, makeHeader(header, defaultContentType, response));
},
//putCallBlob
putCallBlob : (
  url: string,
  body: IKeyValue<any> = {},
  header: IKeyValue<string | number | boolean> = {},
  response: "blob" | undefined = undefined
): AxiosPromise => {
  return axios.put(baseURL + url, body, makeHeader(header, 'blob', response));
},
}