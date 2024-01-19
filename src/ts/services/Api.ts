import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Meeting } from "../model/Meeting";

axios.defaults.baseURL = "http://localhost:5200/api";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        toast.error("Bad request");
        break;
      case 404:
        toast.error("Not found");
        break;
      case 500:
        toast.error("Server error");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Meetings = {
  list: () => request.get<Meeting[]>("/meeting"),
  details: (id: string) => request.get<Meeting>(`/meeting/${id}`),
  create: (meeting: Meeting) => request.post<void>("/meeting", meeting),
  update: (meeting: Meeting) => request.put<void>(`/meeting/${meeting.id}`, meeting),
  delete: (id: string) => request.del<void>(`/meeting/${id}`),
};

const Api = {
  Meetings,
};

export default Api;
