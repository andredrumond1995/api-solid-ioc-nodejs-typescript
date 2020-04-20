import { injectable, inject } from "inversify";
import {
  IUserRepository,
  userRepository,
  UserRepositoryImplMysql,
} from "../repositories/user";
import { User } from "../models/user";
import * as orm from "../orms/user";
import { Repository, DeleteResult } from "typeorm";
import types from "../constants/types";
@injectable()
export class UserService {
  private userRepositoryImplMysql: UserRepositoryImplMysql;
  public constructor(
    @inject(types.user.userRepositoryImplMysql)
    userRepositoryImplMysql?: UserRepositoryImplMysql
  ) {
    this.userRepositoryImplMysql = userRepositoryImplMysql;
  }
  public fetchAll(): Promise<Array<User> | Error> {
    return new Promise((resolve, reject) => {
      return this.userRepositoryImplMysql
        .fetchAll()
        .then((result: User[]) => resolve(result))
        .catch(reject);
    });
  }

  public fetchById(id: number): Promise<User | string | Error> {
    return new Promise((resolve, reject) => {
      this.userRepositoryImplMysql
        .fetchById(id)
        .then((result: User) => {
          if (result) {
            resolve(result);
          } else {
            resolve(`user not found`);
          }
        })
        .catch(reject);
    });
  }

  public add(user: User): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      return this.userRepositoryImplMysql
        .add(user)
        .then(() => resolve(`user added successfully`))
        .catch(reject);
    });
  }

  public updateById(id: number, user: User): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      return this.userRepositoryImplMysql
        .updateById(id, user)
        .then(() => resolve(`user updated successfully`))
        .catch(reject);
    });
  }

  public deleteById(id: number): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      this.userRepositoryImplMysql
        .deleteById(id)
        .then((result: DeleteResult) => {
          if (result.affected > 0) {
            resolve(`user deleted successfully`);
          } else {
            resolve(`user was not deleted`);
          }
        })
        .catch(reject);
    });
  }
}
