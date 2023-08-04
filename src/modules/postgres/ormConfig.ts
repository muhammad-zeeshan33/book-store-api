import { DataSourceOptions } from "typeorm";

const ormConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "bookstore_user",
  password: "abc123",
  database: "bookstore",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
};
export default ormConfig;