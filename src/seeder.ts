import { validate } from "class-validator";
import fs from "fs";
import { getConnection } from "typeorm";
import { Company } from "./entities/company.entity";
import { User } from "./entities/user.entity";

export async function seeder(originSeed: string) {
  const reader = fs.readFileSync(originSeed, "utf8");
  const lines = reader.split(/\r?\n/);
  lines.splice(0, 1);

  await seedCompanies(lines);
  await seedUsers(lines);
}
async function seedUsers(lines: string[]) {
  //Creating 1000 users batch to not overload the DB
  while (lines.length > 0) {
    const lineBatch = lines.slice(0, 1000);
    const insertedUsers: User[] = [];
    for (const line of lineBatch) {
      const user = await lineToUser(line).catch((error) =>
        console.log(`error on getting the line to an user object`, error)
      );
      if (user) insertedUsers.push(user);
    }
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(insertedUsers)
      .execute()
      .catch((error) => console.log(error));
    lines = lines.slice(1000);
  }
}

async function seedCompanies(lines: string[]) {
  const cnpjs = findUniqueCnpj(lines);
  const companies: Company[] = [];
  for (const [index, cnpj] of cnpjs.entries()) {
    try {
      const new_Company = new Company();
      new_Company.CNPJ = cnpj;
      new_Company.name = `Generic Company ${index + 1}`;
      const validationErrors = await validate(new_Company);
      if (validationErrors.length > 0) throw new Error("Validation error");
      companies.push(new_Company);
    } catch (error) {
      console.log("creating a company gave an error: ", error);
    }
  }
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Company)
    .values(companies)
    .execute()
    .catch((error) => console.log(error));
}

function findUniqueCnpj(lines: string[]) {
  let line_values: any[] = [];
  for (const line of lines) {
    const user = line.split(",").slice(6);
    line_values = line_values.concat(user);
  }
  const unique = new Set(line_values);
  unique.delete("NULL");

  return Array.from(unique);
}

async function lineToUser(line: string): Promise<User> {
  const line_values: any[] = line.split(",");
  line_values.forEach((value, index) => {
    if (value === "1") line_values[index] = true;
    else if (value === "0") line_values[index] = false;
    if (value.toLowerCase() === "null") line_values[index] = null;
  });
  const newUser = new User();
  newUser.CPF = line_values[0];
  newUser.private = line_values[1];
  newUser.unfinished = line_values[2];
  newUser.lastPurchaseDate = line_values[3]
    ? new Date(line_values[3])
    : undefined;
  newUser.meanPurchaseValue = line_values[4];
  newUser.lastPurchaseValue = line_values[5];
  newUser.mostBoughtCompany = line_values[6];
  newUser.lastBoughtCompany = line_values[7];

  const validationErrors = await validate(newUser);
  if (validationErrors.length > 0) throw newUser;
  return newUser;
}
