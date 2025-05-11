import { fetchData } from "@/core/base.api";

export async function post(url: string, data: Record<string, any>) {
  const resp = await fetchData("post", url, data);

  const respObj = JSON.parse(resp as string);

  if (respObj.error) {
    throw new Error(respObj.message || "An unknown error occurred.");
  }

  return resp as string;
}

export async function get(url: string) {
  const resp = await fetchData("get", url, undefined);

  const respObj = JSON.parse(resp as string);

  if (respObj.error) {
    throw new Error(respObj.message || "An unknown error occurred.");
  }

  return resp as string;
}

export async function put(url: string, data: Record<string, any>) {
  const resp = await fetchData("put", url, data);
  const respObj = JSON.parse(resp as string);

  if (respObj.error) {
    throw new Error(respObj.message || "An unknown error occurred.");
  }

  return resp as string;
}

export async function deleted(url: string, data: Record<string, any>) {
  const resp = await fetchData("delete", url, data);
  const respObj = JSON.parse(resp as string);

  if (respObj.error) {
    throw new Error(respObj.message || "An unknown error occurred.");
  }

  return resp as string;
}

export async function patch(url: string, data: Record<string, any>) {
  const resp = await fetchData("patch", url, data);

  const respObj = JSON.parse(resp as string);

  if (respObj.error) {
    throw new Error(respObj.message || "An unknown error occurred.");
  }

  return resp as string;
}
