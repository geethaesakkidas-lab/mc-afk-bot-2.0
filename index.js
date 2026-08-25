const http = require('http');
const mineflayer = require('mineflayer');

// Keep-Alive Web Server for Render
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Minecraft Bot Active');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Mineflayer Connection
function createBot() {
  const bot = mineflayer.createBot({
    host: '4friendSMP.aternos.me', // e.g. OreoMC or FalixNodes IP
    port: 46993,
    username: 'AFK_Bot_247'
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
    setTimeout(createBot, 5000); // Rejoin in 5 seconds
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => console.log('Error:', err.message));
}

createBot();
