import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join, sep } from 'path';

export async function hash(file, cwd) {
  if (!file) throw new Error();
  const path = file.startsWith(sep) ? file : join(cwd, file);
  const hash = createHash('sha256');
  const stream = createReadStream(path);
  for await (const chunk of stream) hash.update(chunk);
  console.log(hash.digest('hex'));
}