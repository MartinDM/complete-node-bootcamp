const { on } = require('events');
const http = require('http');
const EventEmitter = require('events');

// Many node modules http, fs, others, also inherit from this class.
class Sales extends EventEmitter {

  constructor(){
    super();
  }

}

const myEmitter = new Sales();

// Listen for events
myEmitter.on('newSale', stock => {
  console.log('Sale made');
  console.log(`Stock level: ${stock}`)
});

myEmitter.on('newSale', stock => {
  console.log('Sale made again');
  console.log(`Stock level: ${stock}`)
});

myEmitter.on('newReturn', stock => {
  console.log('Return made');
  console.log(`Stock level: ${stock}`)
});

// Emit an event
myEmitter.emit('newSale', 9);
myEmitter.emit('newReturn', 5);

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received 3');
  console.log(req.url);
  res.end('Request ')
});

server.on('close', () => {
  console.log('Request received 4');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('waiting for req')
});