const mineflayer = require('mineflayer');
const express = require('express');

// Веб-сервер для UptimeRobot, чтобы хостинг не «засыпал»
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is active!');
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// Функция подключения бота к серверу Aternos
function createBot() {
  const bot = mineflayer.createBot({
    host: 'faceblood.aternos.me', 
    port: 54326,                  
    version: '1.20.1',            
    username: 'AternosBot'        
  });

  bot.on('spawn', () => {
    console.log('Бот зашел на сервер!');
    
    // Защита от кика за AFK: поворот головы каждые 60 секунд
    setInterval(() => {
      bot.look(bot.entity.yaw + 1, bot.entity.pitch, true);
    }, 60000); 
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`${username}: ${message}`);
  });

  bot.on('end', () => {
    console.log('Бот отключился. Переподключение через 10 секунд...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Ошибка бота:', err);
  });
}

createBot();
