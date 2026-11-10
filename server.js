const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Basit test kontrolü
app.get('/', (req, res) => {
  res.send('Uzaktan Kontrol Sinyal Sunucusu Aktif!');
});

// Socket.io Bağlantı Mantığı (9 Haneli ID ve Eşleşme)
io.on('connection', (socket) => {
  console.log('Yeni cihaz bağlandı:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cihaz ayrıldı:', socket.id);
  });
});

// Render'ın atadığı dinamik portu dinle (Yoksa 3000)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başarıyla başlatıldı.`);
});
