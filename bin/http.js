const app = require('../app');
const port = 8081;
const HOST = '0.0.0.0';

app.listen(port, HOST, function () {
  console.log(`this app is running on port ${port}`)
})