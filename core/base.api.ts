"use server";
import log from "loglevel";
import axios from "axios";
import { cookies } from "next/headers";

function createApiInstance(baseUrl: string, headers: Record<string, any>) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers,
  });

  instance.interceptors.request.use(
    (request) => {
      log.warn(`\nMETHOD : ${request.method}`);
      log.warn(`URL : ${request.url}`);
      log.warn(`Request Headers : ${JSON.stringify(request.headers)}`);
      log.warn(`Request Data : ${JSON.stringify(request.data)}`);
      log.warn("REQUEST..." + "\n");

      return request;
    },
    (error) => {
      log.error("REQUEST : ");
      log.error(`Request URL : ${error.config.url}`);
      log.error(`Request Headers : ${JSON.stringify(error.config.headers)}`);
      log.error(`Request Data : ${JSON.stringify(error.config.data)}\n`);

      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      log.warn("RESPONSE : ");
      log.warn(`Response Status : ${response.status}`);
      log.warn(`PATH : ${JSON.stringify(response.config.url)}`);
      log.warn(`Response Headers : ${JSON.stringify(response.headers)}`);
      log.warn(`Response Body : ${JSON.stringify(response.data)}\n`);

      return response;
    },
    (error) => {
      if (error.response) {
        log.error("RESPONSE : ");
        log.error(`Response Status : ${error.response.status}`);
        log.error(`Request URL : ${error.config.url}`);
        log.error(
          `Response Headers : ${JSON.stringify(error.response.headers)}`,
        );
        log.error(
          `Response Body : ${JSON.stringify(error.response.data) || "No response body"}\n`,
        );
      } else {
        log.error("Message : ", error.message + "\n");
      }

      return Promise.reject(error);
    },
  );

  return instance;
}

export async function fetchData(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data: Record<string, any> | undefined,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const api = createApiInstance(process.env.BASE_URL ?? "", {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token?.value}`,
  });

  let response;

  try {
    response = await api({
      method,
      url,
      data,
    });

    return JSON.stringify(response.data);
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        cookieStore.delete("token");
      }

      return JSON.stringify({
        message: error.response.data.message,
        error: true,
      });
    }

    return JSON.stringify({
      message: error.message,
      error: true,
    });
  }
}
