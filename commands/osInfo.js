import { EOL, cpus, homedir, userInfo, arch } from 'os';

export function run(flag) {
  switch (flag) {
    case '--EOL':
      console.log(JSON.stringify(EOL));
      break;
    case '--cpus':
      const list = cpus();
      console.log(`Total CPUs: ${list.length}`);
      list.forEach((c, i) => console.log(`${i+1}. Model: ${c.model}, Speed: ${c.speed/1000} GHz`));
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      console.log(userInfo().username);
      break;
    case '--architecture':
      console.log(arch());
      break;
    default:
      throw new Error();
  }
}