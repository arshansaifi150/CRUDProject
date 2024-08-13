import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fse from 'fs-extra';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fse.emptyDirSync(path.join(__dirname, 'public', 'tinymce'));
fse.copySync(
  path.join(__dirname, 'node_modules', 'tinymce'), 
  path.join(__dirname, 'public', 'tinymce'), 
  { overwrite: true }
);