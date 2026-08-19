const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is active!');
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

console.log('Скрипт index.js успешно запущен!');

function createBot() {
  console.log('Попытка создания бота и подключения к серверу...');
  
  const bot = mineflayer.createBot({
    host: 'faceblood.aternos.me', 
    port: 54326,                 
    version: '1.20.1',            
    username: 'AternosBot'        
  });

  bot.on('spawn', () => {
    console.log('Бот зашел на сервер!');
    
    setInterval(() => {
      bot.look(bot.entity.yaw + 1, bot.entity.pitch, true);
    }, 60000); 
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`${username}: ${message}`);
  });

  bot.on('end', (reason) => {
    console.log('Бот отключился. Причина:', reason);
    console.log('Переподключение через 10 секунд...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Ошибка бота:', err);
  });
}

createBot();
