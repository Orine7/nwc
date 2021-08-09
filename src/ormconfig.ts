import * as dotenv from "dotenv";
import { join } from "path";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
dotenv.config({ path: ".env" });

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, "**", "*.entity.{ts,js}")],
  migrations: [join(__dirname, "migrations/*{.ts,.js}")],
  cli: {
    migrationsDir: "src/migrations",
  },
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export = connectionOptions;
