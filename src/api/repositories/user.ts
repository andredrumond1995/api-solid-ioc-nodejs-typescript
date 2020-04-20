import { getConnection, Repository, DeleteResult } from "typeorm";
import { User } from "../models/user";
import * as orm from "../orms/user";
import { injectable, inject } from "inversify";
import types from "../constants/types";
import e = require("express");
export interface IUserRepository {
  fetchAll(): Promise<User[] | string | Error>;
  fetchById(id: number): Promise<User | string | Error>;
  add(user: User): Promise<string | Error>;
  updateById(id: number, user: User): Promise<string | Error>;
  deleteById(id: number): Promise<DeleteResult | Error>;
}

@injectable()
export class UserRepositoryImplMysql implements IUserRepository {
  private readonly _userRepository: Repository<orm.User>;
  public constructor(
    @inject(types.user.userRepository) userRepository: Repository<orm.User>
  ) {
    this._userRepository = userRepository;
  }
  fetchAll(): Promise<User[] | string | Error> {
    return new Promise((resolve, reject) => {
      this._userRepository
        .find()
        .then((result: User[]) => resolve(result))
        .catch(reject);
    });
  }

  fetchById(id: number): Promise<User | string | Error> {
    return new Promise((resolve, reject) => {
      this._userRepository
        .findOne(id)
        .then((result: User) => resolve(result))
        .catch(reject);
    });
  }

  add(user: User): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      this._userRepository
        .save(user)
        .then(() => resolve())
        .catch(reject);
    });
  }
  updateById(id: number, body: User): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      this._userRepository
        .findOne(id)
        .then((result: User) => {
          result.name = body.name;
          result.email = body.email;
          this._userRepository.save(result);
        })
        .then(() => resolve())
        .catch(reject);
    });
  }
  deleteById(id: number): Promise<DeleteResult | Error> {
    return new Promise((resolve, reject) => {
      this._userRepository.delete(id).then(resolve).catch(reject);
    });
  }
}
export function userRepository() {
  let db_connection = getConnection();
  return db_connection.getRepository(orm.User);
}
