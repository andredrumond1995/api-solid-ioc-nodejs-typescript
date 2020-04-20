import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { User } from "../orms/user";

export async function db(): Promise<Connection> {
  try {
    return await createConnection({
      type: "mysql",
      host: "ip",
      port: 3306,
      username: "root",
      password: "test",
      database: "test",
      entities: [User],
      synchronize: true,
      logging: false,
    });
  } catch (e) {
    console.log(e);
  }
}
