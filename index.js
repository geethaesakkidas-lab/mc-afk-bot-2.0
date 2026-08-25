const http = require('http');
const mineflayer = require('mineflayer');

// -------------------------------------------------------------
// PART 1: Web Server to Trick Render into Staying Online
// -------------------------------------------------------------
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Minecraft Bot HTTP Status: Active');
});

// Render injects a dynamic port via process.env.PORT
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`[HTTP Server] Listening on port ${PORT} for pings`);
});

// -------------------------------------------------------------
// PART 2: Mineflayer Bot Connection & Auto-Reconnect Loop
// -------------------------------------------------------------
function createBot() {
  const bot = mineflayer.createBot({
    host: '4friendSMP.aternos.me', // e.g., FalixNodes or OreoMC server IP
    port: 46993,
    username: 'AFK_Bot_247'
  });

  bot.on('spawn', () => {
    console.log('[Minecraft] Bot successfully spawned in the server.');
  });

  // Reconnect if kicked by server or anti-AFK plugins
  bot.on('kicked', (reason) => {
    console.log('[Minecraft] Kicked from server:', reason);
    console.log('[Minecraft] Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  // Reconnect if server restarts or network drops
  bot.on('end', () => {
    console.log('[Minecraft] Disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('[Minecraft] Connection error:', err.message);
  });
}

createBot();
