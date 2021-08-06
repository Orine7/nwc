import { Connection, createConnection } from "typeorm";
import connectionOptions from "./ormconfig";

async function start() {
  //await connectDb();
  // const app = express();
  // const PORT = 4000;
  // app.get("/", (req, res) => res.send("Express + TypeScript Server"));
  // app.listen(PORT, () => {
  //   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  // });
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
  throw new Error("Error ao se conectar com o banco");
}

start();
