import { Response } from "express";
export class CustomHttpResponse {
  response(status: boolean, dataOrError: unknown, response: Response) {
    return status
      ? response.status(200).json({ status: true, result: dataOrError })
      : response.status(400).json({ status: false, result: dataOrError });
  }
}
