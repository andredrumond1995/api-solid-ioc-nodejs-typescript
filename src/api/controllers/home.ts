import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";

@controller("/")
export class HomeController {
  @httpGet("/")
  public get(@response() response?: Response): Response {
    return response.status(200).json({
      status: true,
      result: `home route working normally`,
    });
  }
}
