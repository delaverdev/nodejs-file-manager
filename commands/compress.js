import { brotliCompress, brotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { join, sep } from 'path';

export async function compress(src, dest, cwd) {
  const fullSrc = src.startsWith(sep) ? src : join(cwd, src);
  const fullDest = dest.startsWith(sep) ? dest : join(cwd, dest);
  await pipeline(
    createReadStream(fullSrc),
    brotliCompress(),
    createWriteStream(fullDest)
  );
}

export async function decompress(src, dest, cwd) {
  const fullSrc = src.startsWith(sep) ? src : join(cwd, src);
  const fullDest = dest.startsWith(sep) ? dest : join(cwd, dest);
  await pipeline(
    createReadStream(fullSrc),
    brotliDecompress(),
    createWriteStream(fullDest)
  );
}