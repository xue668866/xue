const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000; // 端口（需确保云主机安全组开放 80 端口）

const server = http.createServer((req, res) => {
  // 处理请求，返回静态文件
  let filePath = path.join(__dirname, req.url === '/' ? 'Index_305_薛景文.html' : req.url);
  
  // 检查文件是否存在
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end('404 Not Found');
      return;
    }
    
    // 读取并返回文件
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        // 设置响应头（支持 HTML、CSS、JS、图片等）
        const contentType = getContentType(filePath);
        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    });
  });
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 辅助函数：根据文件扩展名设置 Content-Type
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html': return 'text/html';
    case '.css':  return 'text/css';
    case '.js':   return 'application/javascript';
    case '.jpg':  return 'image/jpeg';
    case '.png':  return 'image/png';
    default:      return 'application/octet-stream';
  }
}