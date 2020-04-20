import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import * as bodyParser from "body-parser";
import types from "../constants/types";
import { UserService } from "../services/user";
import { UserRepositoryImplMysql } from "../repositories/user";
import "../controllers/home";
import "../controllers/user";
import { bindings } from "./inversify.db.bindings";
import e = require("express");

export function server(): Promise<e.Application> {
  return new Promise(async (resolve, reject) => {
    // load everything needed to the Container
    let container = new Container();
    await container.bind<UserService>(types.user.userService).to(UserService);
    await container
      .bind<UserRepositoryImplMysql>(types.user.userRepositoryImplMysql)
      .to(UserRepositoryImplMysql);
    await container.loadAsync(bindings).catch(reject);
    // server
    let server = new InversifyExpressServer(container);
    //app configs
    server.setConfig((app) => {
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use(bodyParser.json());
    });
    resolve(server.build());
  });
}
