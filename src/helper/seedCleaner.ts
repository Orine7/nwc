import fs from "fs";

async function start(originSeed: string, destinationSeed: string) {
  const reader = fs.readFileSync(originSeed, "utf8");
  fs.writeFileSync(destinationSeed, "");
  const lines = reader.split(/\r?\n/);
  fs.appendFileSync(destinationSeed, createColumnNames(lines[0]));
  lines.splice(0, 1);
  for (const line of lines) {
    const lineToCSV = line.replace(/\,/g, ".").match(/\S+/g)?.join(",");
    fs.appendFileSync(destinationSeed, `${lineToCSV}\n`);
  }
}

function createColumnNames(line: string) {
  const cleanString = line
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .match(/\S+/g);
  // This is real shitty code... better improve it
  const columnNames = `${cleanString?.[0]},${cleanString?.[1]},${cleanString?.[2]},${cleanString?.[3]}_${cleanString?.[4]}_${cleanString?.[5]}_${cleanString?.[6]},${cleanString?.[7]}_${cleanString?.[8]},${cleanString?.[9]}_${cleanString?.[10]}_${cleanString?.[11]}_${cleanString?.[12]},${cleanString?.[13]}_${cleanString?.[14]}_${cleanString?.[15]},${cleanString?.[16]}_${cleanString?.[17]}_${cleanString?.[18]}_${cleanString?.[19]}\n`;
  return columnNames;
}

start("src/seed/base_teste.txt", "src/seed/cleanedSeed.csv");
