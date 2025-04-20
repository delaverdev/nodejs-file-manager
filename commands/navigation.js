import { stat, readdir } from 'fs/promises';
import { dirname, join, resolve, sep } from 'path';
import { failOperation } from '../utils/helpers.js';

export async function up(currentDir) {
  const parent = dirname(currentDir);
  return parent !== currentDir ? parent : currentDir;
}

export async function cd(target, currentDir) {
  if (!target) throw new Error();
  const full = target.startsWith(sep) ? target : join(currentDir, target);
  const s = await stat(full);
  if (!s.isDirectory()) throw new Error();
  return resolve(full);
}

export async function ls(currentDir) {
  try {
    const items = await readdir(currentDir, { withFileTypes: true });
    const dirs = items
      .filter(i => i.isDirectory())
      .map(d => d.name)
      .sort();
    const files = items
      .filter(i => i.isFile())
      .map(f => f.name)
      .sort();
    console.log('Type	Name');
    dirs.forEach(d => console.log('DIR	' + d));
    files.forEach(f => console.log('FILE	' + f));
  } catch {
    failOperation();
  }
}