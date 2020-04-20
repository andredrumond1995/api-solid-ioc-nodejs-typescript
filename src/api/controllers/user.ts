import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  response,
  requestParam,
  requestBody,
} from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "../services/user";
import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import types from "../constants/types";
import { CustomHttpResponse } from "../utils/http_response";

@controller("/user")
export class UserController {
  private _httpResponse = new CustomHttpResponse();
  constructor(
    @inject(types.user.userService) private userService: UserService
  ) {}

  @httpGet("/")
  public fetchAll(@response() response: Response): Promise<Response> {
    return this.userService
      .fetchAll()
      .then((result: User[]) =>
        this._httpResponse.response(true, result, response)
      )
      .catch((error) => this._httpResponse.response(false, error, response));
  }

  @httpGet("/:id")
  public fetchById(
    @response() response: Response,
    @requestParam("id") param: number
  ): Promise<Response> {
    return this.userService
      .fetchById(Number(param))
      .then((result: User) =>
        this._httpResponse.response(true, result, response)
      )
      .catch((error) => this._httpResponse.response(false, error, response));
  }

  @httpPost("/")
  public add(@response() response: Response, @requestBody() body: User) {
    return this.userService
      .add(body)
      .then((result) => this._httpResponse.response(true, result, response))
      .catch((error) => this._httpResponse.response(false, error, response));
  }

  @httpPut("/:id")
  public updateById(
    @response() response: Response,
    @requestParam("id") param: number,
    @requestBody() body: User
  ) {
    return this.userService
      .updateById(Number(param), body)
      .then((result) => this._httpResponse.response(true, result, response))
      .catch((error) => this._httpResponse.response(false, error, response));
  }

  @httpDelete("/:id")
  public deleteById(
    @response() response: Response,
    @requestParam("id") param: number
  ) {
    return this.userService
      .deleteById(param)
      .then((result) => this._httpResponse.response(true, result, response))
      .catch((error) => this._httpResponse.response(false, error, response));
  }
}
