import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

export const sendSuccess = <T>(res: Response, data: T, statusCode: number = 200): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors?: any[]
): Response => {
  const body: ApiResponse = {
    success: false,
    message,
  };
  if (errors && errors.length > 0) {
    body.errors = errors;
  }
  return res.status(statusCode).json(body);
};
