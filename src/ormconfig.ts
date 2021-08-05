import * as dotenv from "dotenv";
import { join } from "path";
import { ConnectionOptions } from "typeorm";
dotenv.config({ path: ".env" });

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: config.host,
  port: 5432,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: ["**/*.entity{.ts,.js}"],
  migrations: [join(__dirname, "migrations/*{.ts,.js}")],
  cli: {
    migrationsDir: "src/migrations",
  },
  synchronize: false,
};

export = connectionOptions;
