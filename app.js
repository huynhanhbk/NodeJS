const http = require('http');
const routes = require('./routes');

//const server = http.createServer(routes);
console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3001);

//lab1.2 -1.6
// const http = require('http');
// const fs = require('fs');
// //fs.writeFileSync("message.txt", "DUMMY");

// const server = http.createServer((req, res) => {
//   //console.log(req.url, req.method, req.headers);
//   //process.exit(); thoát khỏi event loop, thoát khỏi server

//   const url = req.url;
//   const method = req.method;
//   if (url === '/') {
//     res.write('<html>');
//     res.write('<head><title>Enter Message</title><head>');
//     res.write(
//       '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
//     );
//     res.write('</html>');
//     return res.end();
//   }

//   if (url === '/message' && method === 'POST') {
//     // Đọc body của request
//     const body = [];
//     req.on('data', (chunk) => {
//       console.log(chunk);
//       body.push(chunk);
//     });

//     return req.on('end', () => {
//       const parseBody = Buffer.concat(body).toString();
//       const message = parseBody.split('=')[1];
//       console.log(parseBody);
//       fs.writeFile('message.txt', message, (err) => {
//         res.statusCode = 302;
//         res.setHeader('Location', '/');
//         return res.end();
//       });
//     });
//   }

//   res.setHeader('Content-Type', 'text-html');
//   res.write('<html>');
//   res.write('<head><title>My First Page</title></head>');
//   res.write('<body><h1>Hello from my Node.js Server</h1></body>');
//   res.write('</html>');
//   res.end();
// });

// server.listen(3001);
