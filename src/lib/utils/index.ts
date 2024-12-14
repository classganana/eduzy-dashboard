import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

import { Constants } from "./constants";
import { AppTexts } from "./texts";

import { UserJwtTokenPayload } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenFromLocalStorage() {
  const accessToken = localStorage.getItem(
    Constants.LocalStorageAccessTokenKey,
  );

  if (accessToken) {
    const tokenInformation: UserJwtTokenPayload = jwtDecode(accessToken);

    const tokenExpiry = new Date((tokenInformation.exp ?? 0) * 1000);
    const now = new Date();

    if (tokenExpiry < now) {
      /* Token expired */
      return null;
    }

    return {
      ...tokenInformation,
      isAuthenticated: true,
      accessToken,
    };
  }

  return null;
}

export function isAuthenticated() {
  const tokenInformation = getTokenFromLocalStorage();

  return tokenInformation?.isAuthenticated ?? false;
}
export function removeTokenFromLocalStorage() {
  localStorage.removeItem(Constants.LocalStorageAccessTokenKey);
}

export const greetingMessageBasedOnTime = () => {
  if (new Date().getHours() < 12) {
    return AppTexts.goodMorningText;
  } else if (new Date().getHours() < 17) {
    return AppTexts.goodAfternoonText;
  } else if (new Date().getHours() < 20) {
    return AppTexts.goodEveningText;
  } else {
    return AppTexts.goodNightText;
  }
};

export const replaceVarsInstr = (
  input: string,
  inpObj: Record<string, any>,
) => {
  let output = input;

  for (const key in inpObj) {
    const regex = new RegExp(`\{${key}\}`, "g");

    output = output.replace(regex, inpObj[key]);
  }

  return output;
};
