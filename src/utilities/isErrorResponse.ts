import { APIError } from "api/types";

export function isErrorResponse(response: any): response is APIError {
  return response && response.reason;
}
