const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// 允许解析 JSON (为以后做准备)
app.use(express.json());

// 1. 首页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. 托管静态文件 (css, js, images)
// 这样访问 /style.css 就能拿到根目录的样式
app.use(express.static(__dirname));

// 3. 托管 Mini Apps
// 访问 /mini_apps/kanban_board 就会自动找那个文件夹下的 index.html
app.use('/mini_apps', express.static(path.join(__dirname, 'mini_apps')));

// 启动服务
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📂 Serving apps from: ${path.join(__dirname, 'mini_apps')}`);
});
