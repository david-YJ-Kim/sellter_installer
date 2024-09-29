const net = require('net');
const deasync = require('deasync');

// Function to find available port synchronously
// function doJob(startPort) {
//   let availablePort = null;
//   let done = false;

//   findAvailablePort(startPort)
//     .then((port) => {
//       availablePort = port;
//       done = true;
//     })
//     .catch((err) => {
//       console.error('Error finding available port:', err);
//       done = true;
//     });

//   // Block the event loop until `done` becomes true (making it sync)
//   while (!done) {
//     deasync.runLoopOnce();
//   }

//   return availablePort;
// }

async function doJob(startPort: string) {
  try {
    const port = await findAvailablePort(startPort);
    console.log('End');
    return port;
  } catch (err) {
    console.log('ERROR : ' + err.message);
  }
}

// Original async function to find available port
function findAvailablePort(startPort: string) {
  return new Promise((resolve, reject) => {
    const port = parseInt(startPort, 10);
    const server = net.createServer();

    server.listen(port, () => {
      server.once('close', () => resolve(port));
      server.close();
      console.log('start listen server');
    });

    server.on('error', () => {
      findAvailablePort(port + 1)
        .then(resolve)
        .catch(reject);
    });
  });
}

module.exports = { doJob };
