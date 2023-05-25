import { authOptions } from "@/lib/auth";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import https from "https";
import { getServerSession } from "next-auth";

const api = axios.create({
  baseURL: "https://test.employee.tokoweb.xyz/api/",
  timeout: 20000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

async function authInterceptor(config: InternalAxiosRequestConfig) {
  const session = await getServerSession(authOptions);
  const token = session?.user.data.token
  if (session?.user) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

api.interceptors.request.use(authInterceptor);

export default api;
