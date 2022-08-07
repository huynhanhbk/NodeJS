const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  //process.exit(); thoát khỏi event loop, thoát khỏi server
});

server.listen(3000);
