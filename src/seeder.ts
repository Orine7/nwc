import fs from "fs";
import { getConnection } from "typeorm";
import { User } from "./entities/user.entity";

export async function seedFrom(originSeed: string) {
  const reader = fs.readFileSync(originSeed, "utf8");
  const lines = reader.split(/\r?\n/);
  lines.splice(0, 1);
  for (const line of lines) {
    const lineArr = lineToArray(line);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          CPF: lineArr[0],
          private: lineArr[1],
          unfinished: lineArr[2],
          lastPurchaseDate: new Date(lineArr[3]),
          meanPurchaseValue: lineArr[4],
          lastPurchaseValue: lineArr[5],
          mostBoughtCompany: lineArr[6],
          lastBoughtCompany: lineArr[7],
        },
      ])
      .execute();
    break;
  }
}

function lineToArray(line: string) {
  const line_values: any[] = line.split(",");
  line_values.forEach((value, index) => {
    if (value === "1") line_values[index] = true;
    else if (value === "0") line_values[index] = false;
    if (value.toLowerCase() === "null") line_values[index] = null;
  });
  return line_values;
}
