const net = require('net');

// Function that manages the service port
const dojob = async (recommandedPort) => {
  console.log('Start service port manager.');

  try {
    const availablePort = await findAvailablePort(recommandedPort);
    console.log(`Found available port: ${availablePort}`);
    return availablePort;
  } catch (error) {
    console.error('Error finding available port:', error);
  }
};

// Function to check if a port is available
function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const port = parseInt(startPort, 10); // Convert the recommended port to an integer
    const server = net.createServer();

    // When the server successfully listens, the port is available
    server.listen(port, () => {
      server.once('close', () => {
        resolve(port); // Return available port
      });
      server.close();
    });

    // If there is an error (port is in use), try the next port
    server.on('error', () => {
      findAvailablePort(String(port + 1))
        .then(resolve)
        .catch(reject);
    });
  });
}

module.exports = { doJob };
