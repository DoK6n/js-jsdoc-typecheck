import fs from 'fs';
import { glob } from 'glob';

async function writeFile(filePath, data) {
  await fs.promises.writeFile(filePath, data, { flag: 'w' });
}

async function mkdir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

async function TypeReader() {
  const readTypes = async () => {
    const filePaths = await glob.sync('./src/**/types/*.d.ts', {
      ignore: ['node_modules/**'],
    });
    return filePaths;
  };

  const filePaths = await readTypes();

  const data = filePaths
    .map((filePath) => `/// <reference path="../${filePath}" />\n`)
    .join('');

  const typesDir = './types';
  const typesFile = `${typesDir}/index.d.ts`;

  try {
    await fs.promises.access(typesFile, fs.constants.F_OK);
  } catch {
    await mkdir(typesDir);
  }

  await writeFile(typesFile, data);

  return filePaths;
}

await TypeReader();
