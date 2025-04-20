export function parseUsername(argv) {
    const arg = argv.find(a => a.startsWith('--username='));
    return arg ? arg.split('=')[1] : 'Anonymous';
  }
  
  export function printPrompt(dir) {
    console.log(`You are currently in ${dir}`);
  }
  
  export function invalidInput() {
    console.log('Invalid input');
  }
  
  export function failOperation() {
    console.log('Operation failed');
  }