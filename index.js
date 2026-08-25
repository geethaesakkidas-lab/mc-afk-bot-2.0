const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: '4friendSMP.aternos.me', // e.g. OreoMC or falixnodes IP
    port: 46993,
    username: 'AFK_Bot_247'
  });

  // Reconnect immediately on kick or disconnect
  bot.on('kicked', (reason) => {
    console.log('Kicked for:', reason);
    setTimeout(createBot, 5000); // Rejoin after 5 seconds
  });

  bot.on('error', (err) => {
    console.log('Error encountered:', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting...');
    setTimeout(createBot, 5000); // Rejoin after 5 seconds
  });
}

createBot();
