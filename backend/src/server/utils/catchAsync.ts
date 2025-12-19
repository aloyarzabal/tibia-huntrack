import { NextFunction, Request, RequestHandler, Response } from "express";

export function catchAsync<T extends RequestHandler>(fn: T) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
