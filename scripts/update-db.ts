import { copy } from 'fs-extra';
import { readFileSync, writeFileSync, readdirSync, lstatSync } from 'fs';
import path from 'path';

const resolveCopyFolder = async (from: string, to: string) => {
  const sourcePath = path.resolve(from);
  const destinationPath = path.resolve(to);
  try {
    await copy(sourcePath, destinationPath);
    console.log('Folder copied successfully.');
  } catch (error) {
    console.error('Error copying folder:', error);
  }
}

const cleanFilesInDir = async (dir: string) => {  
  const files = readdirSync(path.resolve(dir));

  for (const file of files) {
    const filePath = path.resolve(dir, file);
    const stats = lstatSync(filePath);
    // console.log(filePath);
    if (stats.isFile()) {
      const fileContent = readFileSync(filePath, 'utf8');
      let newFileContent = fileContent.replace(/\/\/ REMOVE-FROM-IMPORT[\s\S]*?\/\/ END REMOVE-FROM-IMPORT\s*[\r\n]/g, '');
      newFileContent = newFileContent.replace(/\/\/ @ts-expect-error\s*[\r\n]/g, '');
      writeFileSync(filePath, newFileContent);
    }

    if (stats.isDirectory()) {
      await cleanFilesInDir(filePath);
    }
  }
}

export const syncFiles = async () => {
  await resolveCopyFolder('node_modules/@canopie-club/drizzle/database', 'server/database');
  await resolveCopyFolder('node_modules/@canopie-club/drizzle/tasks', 'server/tasks');
  await resolveCopyFolder('node_modules/@canopie-club/drizzle/data/types', 'assets/types');

  // Read all the files in the copied folders
  // and remove "// REMOVE-FROM-IMPORT" until "// END REMOVE-FROM-IMPORT"
  // From each file
  await cleanFilesInDir('server/database');
  await cleanFilesInDir('server/tasks');
  await cleanFilesInDir('assets/types');
}

syncFiles();