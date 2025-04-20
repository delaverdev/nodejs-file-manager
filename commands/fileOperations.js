import { promises as fs, createReadStream, createWriteStream } from 'fs';
import { join, basename, sep } from 'path';
import { pipeline } from 'stream/promises';

export async function cat(file, cwd) {
  if (!file) throw new Error();
  const path = file.startsWith(sep) ? file : join(cwd, file);
  const stream = createReadStream(path, 'utf8');
  for await (const chunk of stream) process.stdout.write(chunk);
  console.log();
}

export async function add(name, cwd) {
  const path = join(cwd, name);
  await fs.writeFile(path, '');
}

export async function rn(oldName, newName, cwd) {
  const oldPath = oldName.startsWith(sep) ? oldName : join(cwd, oldName);
  const newPath = join(dirname(oldPath), newName);
  await fs.rename(oldPath, newPath);
}

export async function cp(src, dest, cwd) {
  const fullSrc = src.startsWith(sep) ? src : join(cwd, src);
  const fullDestDir = dest.startsWith(sep) ? dest : join(cwd, dest);
  await fs.mkdir(fullDestDir, { recursive: true });
  const destPath = join(fullDestDir, basename(fullSrc));
  await pipeline(createReadStream(fullSrc), createWriteStream(destPath));
}

export async function mv(src, dest, cwd) {
  await cp(src, dest, cwd);
  const fullSrc = src.startsWith(sep) ? src : join(cwd, src);
  await fs.rm(fullSrc);
}

export async function rm(file, cwd) {
  const path = file.startsWith(sep) ? file : join(cwd, file);
  await fs.rm(path);
}