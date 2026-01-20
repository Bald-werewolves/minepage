# MinePage 前端部署到云服务器完整指南

本文档详细介绍如何将 MinePage 前端项目部署到云服务器并运行。由于你的后端 API 已经在云开发平台部署，本指南重点介绍前端的部署流程。

## 🎯 部署概览

```
本地开发环境 → 构建静态文件 → 上传到云服务器 → 配置 Web 服务器 → 访问网站
```

## 📋 前置要求

### 技术栈要求
- Node.js 18.0 或更高版本
- npm 或 yarn 或 pnpm
- Git (用于版本控制)

### 云服务器要求
- Linux/Windows 云服务器
- SSH 访问权限
- 至少 1GB RAM，10GB 存储空间
- 支持 Node.js 的运行环境

### 域名配置 (可选)
- 已购买域名
- DNS 解析指向服务器 IP

## 💻 开发环境 vs 生产环境

### 本地开发
```bash
cd web
npm install
npm run dev  # 启动开发服务器
```
访问: `http://localhost:3000`

### 生产部署
```bash
# 构建生产版本（本指南的内容）
npm run build
# 然后部署构建结果
```

---

## 🚀 部署步骤

### 步骤1: 本地构建项目

#### 1.1 安装依赖
```bash
# 进入前端目录
cd web

# 安装项目依赖
npm install
```

#### 1.2 构建生产版本
```bash
# 构建静态文件
npm run build

# 构建结果在 out/ 目录
ls -la out/
```

#### 1.3 验证构建结果
```bash
# 预览构建结果（可选）
npm run start

# 访问 http://localhost:3000 验证
```

### 步骤2: 准备云服务器

#### 2.1 连接到云服务器
```bash
# SSH 连接到服务器
ssh username@your-server-ip

# 更新系统包
sudo apt update && sudo apt upgrade -y  # Ubuntu/Debian
# 或
yum update -y  # CentOS/RHEL
```

#### 2.2 安装 Node.js
```bash
# 使用 NodeSource 安装最新 LTS 版本
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

#### 2.3 创建项目目录
```bash
# 创建网站目录
sudo mkdir -p /var/www/minepage
cd /var/www/minepage

# 设置权限
sudo chown -R $USER:$USER /var/www/minepage
```

### 步骤3: 上传项目文件

#### 3.1 使用 SCP 上传 (推荐)
```bash
# 从本地上传构建文件
scp -r web/out/* username@your-server-ip:/var/www/minepage/

# 或者上传整个项目（用于后续更新）
scp -r web username@your-server-ip:/var/www/
```

#### 3.2 使用 Git 部署
```bash
# 在服务器上克隆项目
cd /var/www
git clone https://github.com/yourusername/minepage.git
cd minepage/web

# 安装依赖并构建
npm install
npm run build
```

#### 3.3 使用 FTP/SFTP 上传
使用 FileZilla 或其他 FTP 客户端上传 `web/out/` 目录的内容到服务器的 `/var/www/minepage/` 目录。

### 步骤4: 配置 Web 服务器

#### 选项1: 使用 Nginx (推荐)

##### 4.1.1 安装 Nginx
```bash
# Ubuntu/Debian
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y

# 启动并启用 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

##### 4.1.2 配置 Nginx 站点
```bash
# 创建站点配置文件
sudo nano /etc/nginx/sites-available/minepage
```

添加以下配置：
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com your-server-ip;

    root /var/www/minepage;
    index index.html index.htm;

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 处理 Next.js 路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理（如果需要）
    location /api/ {
        proxy_pass https://k71otivpmn.sealoshzh.site/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

##### 4.1.3 启用站点
```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/minepage /etc/nginx/sites-enabled/

# 删除默认站点（可选）
sudo rm /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

#### 选项2: 使用 Apache

##### 4.2.1 安装 Apache
```bash
# Ubuntu/Debian
sudo apt install apache2 -y

# CentOS/RHEL
sudo yum install httpd -y
```

##### 4.2.2 配置 Apache 站点
```bash
# 创建站点配置
sudo nano /etc/apache2/sites-available/minepage.conf
```

添加配置：
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    DocumentRoot /var/www/minepage

    <Directory /var/www/minepage>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # SPA 路由支持
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]

    # 缓存设置
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </FilesMatch>
</VirtualHost>
```

##### 4.2.3 启用站点
```bash
# 启用重写模块
sudo a2enmod rewrite

# 启用站点
sudo a2ensite minepage

# 禁用默认站点
sudo a2dissite 000-default

# 重启 Apache
sudo systemctl restart apache2
```

#### 选项3: 使用 Node.js 服务器

##### 4.3.1 安装 PM2
```bash
# 安装 PM2 进程管理器
sudo npm install -g pm2

# 创建简单的静态文件服务器
cd /var/www/minepage
```

##### 4.3.2 创建服务器脚本
```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();

// 提供静态文件
app.use(express.static(path.join(__dirname)));

// 处理 SPA 路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

##### 4.3.3 启动服务器
```bash
# 安装依赖
npm init -y
npm install express

# 使用 PM2 启动
pm2 start server.js --name minepage

# 设置开机自启
pm2 startup
pm2 save
```

### 步骤5: 配置 HTTPS (SSL)

#### 5.1 使用 Let's Encrypt (免费)
```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 设置自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

#### 5.2 使用其他 SSL 证书
将证书文件上传到服务器并在 Nginx/Apache 配置中引用。

### 步骤6: 配置防火墙

```bash
# Ubuntu/Debian (ufw)
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

### 步骤7: 域名配置

#### 7.1 DNS 解析
在域名服务商处添加 A 记录：
```
类型: A
主机记录: @ 或 www
记录值: 你的服务器IP地址
TTL: 600
```

#### 7.2 验证配置
```bash
# 测试域名解析
nslookup your-domain.com

# 测试网站访问
curl -I your-domain.com
```

## 🔍 故障排除

### 常见问题

#### 1. 网站无法访问
```bash
# 检查 Nginx/Apache 状态
sudo systemctl status nginx
sudo systemctl status apache2

# 查看错误日志
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/apache2/error.log
```

#### 2. 路由不工作 (404错误)
确保 Web 服务器配置了 SPA 路由回退：
```nginx
# Nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### 3. API 调用失败
检查前端代码中的 API 地址是否正确：
```javascript
// 应该是你的云平台 API 地址
fetch('https://k71otivpmn.sealoshzh.site/send-danmaku', ...)
```

#### 4. 图片不显示
```bash
# 检查文件权限
ls -la /var/www/minepage/

# 设置正确权限
sudo chown -R www-data:www-data /var/www/minepage/
sudo chmod -R 755 /var/www/minepage/
```

## 📊 性能优化

### 1. 启用压缩
```nginx
# Nginx 配置
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. 设置缓存
```nginx
# 静态资源缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN 加速 (可选)
- 使用 CDN 服务如 Cloudflare
- 配置静态资源分发

## 🔄 更新部署

### 方法1: 重新构建上传
```bash
# 本地重新构建
cd web
npm run build

# 上传新文件
scp -r out/* username@server:/var/www/minepage/

# 重载 Web 服务器
sudo systemctl reload nginx
```

### 方法2: 自动化部署
```bash
# 使用 Git 拉取最新代码
cd /var/www/minepage
git pull origin main

# 重新构建
npm install
npm run build

# 重启服务
sudo systemctl reload nginx
```

## 📈 监控和维护

### 日志监控
```bash
# 查看访问日志
sudo tail -f /var/log/nginx/access.log

# 查看错误日志
sudo tail -f /var/log/nginx/error.log
```

### 性能监控
- 使用 `htop` 或 `top` 监控系统资源
- 设置日志轮转防止磁盘满
- 定期更新系统和软件

### 备份策略
```bash
# 备份网站文件
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/minepage/

# 备份数据库（如果有）
# 根据你的云平台备份策略执行
```

## 🌐 多环境部署

### 开发环境
- 使用 `npm run dev` 本地开发
- 地址: `http://localhost:3000`

### 测试环境
- 部署到测试服务器
- 使用不同的域名或子域名

### 生产环境
- 部署到生产服务器
- 配置 HTTPS
- 设置监控和告警

## 📞 技术支持

### 验证部署成功
1. ✅ 网站可以正常访问
2. ✅ 页面样式正常显示
3. ✅ 留言功能可以正常提交
4. ✅ 弹幕可以正常显示
5. ✅ 移动端显示正常

### 如果遇到问题
1. 检查浏览器开发者工具的网络请求
2. 查看服务器日志
3. 验证 API 地址是否正确
4. 确认防火墙设置
5. 检查文件权限

---

🎉 恭喜！你的 MinePage 前端已经成功部署到云服务器。现在你可以通过域名访问你的个人博客网站了！

