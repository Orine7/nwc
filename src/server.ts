import { Connection, createConnection } from "typeorm";
import connectionOptions from "./ormconfig";
import { seeder } from "./seeder";

async function start() {
  await connectDb();
  await seeder("./src/seed/cleanedSeed.csv");
}

async function connectDb(retries = 5): Promise<Connection> {
  while (retries) {
    try {
      return await createConnection(connectionOptions);
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 10000));
    }
  }
  throw new Error("Error connecting to the db");
}

start();
