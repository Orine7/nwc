import { Connection, createConnection } from "typeorm";
import { User } from "./entities/user.entity";
import connectionOptions from "./ormconfig";
import { seeder } from "./seeder";

async function start() {
  const connnection = await connectDb();
  const users = await connnection.getRepository(User).find();
  //check if DB is already populated
  if (!(users.length > 0)) await seeder("./src/seed/cleanedSeed.csv");
  console.log("Done!");
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
