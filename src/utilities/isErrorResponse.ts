import { APIError } from "api/types";

export function isErrorResponse(response: any): response is APIError {
    console.log("Error", response);
  return response && response.reason;
}
