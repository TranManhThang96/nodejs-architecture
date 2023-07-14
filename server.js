const app = require('./src/app');

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`eCommerce start with ${PORT}`);
});

// SIGINT (tín hiệu bàn phím interrupt)
// SIGINT khi người dùng nhấn phím Ctrl + C trên bàn phím để yêu cầu dừng quá trình đó
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Exit Server Express');
    // notify.send(ping...)
  });
});
