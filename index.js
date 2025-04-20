#!/usr/bin/env node

import { createInterface } from 'readline';
import { homedir, cpus, userInfo, arch, EOL as osEOL } from 'os';
import { join, resolve, dirname, basename, sep } from 'path';
import { promises as fsPromises, createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';
import { brotliCompress, brotliDecompress } from 'zlib';
import { argv, exit } from 'process';

import { parseUsername, printPrompt, invalidInput, failOperation } from './utils/helpers.js';
import * as nav from './commands/navigation.js';
import * as fileOps from './commands/fileOperations.js';
import * as osInfo from './commands/osInfo.js';
import * as hashCmd from './commands/hash.js';
import * as compressCmd from './commands/compress.js';

const username = parseUsername(argv);
let currentDir = homedir();

// Main handler
async function handle(line) {
  const [cmd, ...args] = line.trim().split(' ');
  try {
    switch (cmd) {
      case '.exit':
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        exit(0);
      case 'up':
        currentDir = await nav.up(currentDir);
        break;
      case 'cd':
        currentDir = await nav.cd(args[0], currentDir);
        break;
      case 'ls':
        await nav.ls(currentDir);
        break;
      case 'cat':
        await fileOps.cat(args[0], currentDir);
        break;
      case 'add':
        await fileOps.add(args[0], currentDir);
        break;
      case 'rn':
        await fileOps.rn(args[0], args[1], currentDir);
        break;
      case 'cp':
        await fileOps.cp(args[0], args[1], currentDir);
        break;
      case 'mv':
        await fileOps.mv(args[0], args[1], currentDir);
        break;
      case 'rm':
        await fileOps.rm(args[0], currentDir);
        break;
      case 'os':
        osInfo.run(args[0]);
        break;
      case 'hash':
        await hashCmd.hash(args[0], currentDir);
        break;
      case 'compress':
        await compressCmd.compress(args[0], args[1], currentDir);
        break;
      case 'decompress':
        await compressCmd.decompress(args[0], args[1], currentDir);
        break;
      default:
        invalidInput();
    }
  } catch {
    failOperation();
  } finally {
    printPrompt(currentDir);
  }
}

// Startup
console.log(`Welcome to the File Manager, ${username}!`);
printPrompt(currentDir);

const rl = createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', handle);
rl.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  rl.close();
  exit(0);
});