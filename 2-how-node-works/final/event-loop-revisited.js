const fs = require('fs');
const crypto = require("crypto");

setTimeout( ()=> console.log(
  'Timer 1 finished'
), 0);

setImmediate( () => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('IO Done')
  setTimeout( ()=> console.log( 'Timer 2 finished'), 0);
  setTimeout( ()=> console.log( 'Timer 3 finished'), 1000);
  setImmediate( () => console.log('Immediate 2 finished'));

  process.nextTick( () => console.log('TICK'));

  /* CRYPTO */
  const today = Date.now();
  process.env.UV_THREADPOOL_SIZE = 1;
  
  // Blocks execution of the event loop when using the sync version which accepts callback

  // Blocks code execution
  // Won't run in the Event loop, so won't be outsourced to Event Pool.
  // They run on the main thread, synchronously :( 
    // Note 'sync' version of these methods has a side effect.
  crypto.pbkdf2Sync('Password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - today, "Encrypted 1");

  crypto.pbkdf2Sync('Password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - today, "Encrypted 2");

  crypto.pbkdf2Sync('Password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - today, "Encrypted 3");

  // These blocked exection ^
  // Parser can then go back to the top to log timer outputs, even if they were done way before.

/*   
  // Async versions :) 
  crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - today, "Encrypted 2");
  });
  crypto.pbkdf2('Pass ', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - today, "Encrypted 3");
  }); */

});




console.log('Top level code');