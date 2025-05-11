import { deleteCookie, getCookie, setCookie } from "cookies-next";
import log from "loglevel";

export const setICookies = async (key: string, value: string, time: number) => {
  setCookie(key, value, {
    expires: new Date(Date.now() + time * 24 * 60 * 60 * 1000),
  });
};

export const getICookies = async (key: string) => {
  try {
    const [data] = await Promise.all([getCookie(key)]);

    if (data === undefined) {
      log.warn("error get cookie " + key);

      return "";
    }
    log.warn("success get cookie " + key);

    return data;
  } catch (e) {
    log.warn("error get cookie " + e);

    return "";
  }
};

export const removeICookies = async (key: string) => {
  try {
    deleteCookie(key);
  } catch (e) {
    throw new Error("error remove cookie " + e);
  }
};
