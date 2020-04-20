import { AsyncContainerModule } from "inversify";
import types from "../constants/types";
import { db } from "../config/db";
import { User } from "../orms/user";
import { Repository, Connection } from "typeorm";
import { userRepository } from "../repositories/user";
export const bindings = new AsyncContainerModule(async (bind) => {
  await db();
  await require("../services/user");

  bind<Repository<User>>(types.user.userRepository)
    .toDynamicValue(() => {
      return userRepository();
    })
    .inRequestScope();
});
