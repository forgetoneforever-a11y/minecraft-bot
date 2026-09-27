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

function createBot() {
  console.log('Создание экземпляра бота...');
  
  const bot = mineflayer.createBot({
    host: 'Excaliburx.aternos.me', // Новый адрес сервера[cite: 2]
    port: 26693,                 // Новый порт сервера[cite: 2]
    version: '1.20.1',            
    username: 'AternosAFKBot'        
  });

  bot.on('spawn', () => {
    console.log('Бот успешно зашел на сервер и заспавнился!');
  });

  // Автоматически каждые 10 секунд поворачиваем голову, чтобы сервер не кикал за AFK
  let moving = false;
  bot.on('spawn', () => {
    if (moving) return;
    moving = true;
    
    setInterval(() => {
      if (bot.entity) {
        bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
      }
    }, 10000);
  });

  bot.on('end', (reason) => {
    console.log('Бот отключился от сервера. Причина:', reason);
    console.log('Попытка переподключения через 15 секунд...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Ошибка в работе бота:', err);
  });
}

createBot();
