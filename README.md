# MinePage - 个人博客网站

一个现代化的个人博客网站，使用 Next.js 14、TypeScript 和 Tailwind CSS 构建。

## 📁 项目结构

```
minepage/
├── web/                    # Next.js 前端项目
├── server/                 # 云平台后端函数（已部署到云平台）
├── FRONTEND-ASSETS-GUIDE.md    # 前端资源替换指南
├── FRONTEND-DEPLOYMENT-GUIDE.md # 前端部署指南
├── DEPLOYMENT.md          # 完整部署指南
├── QUICKSTART.md          # 快速开始指南
└── README.md             # 项目说明
```

## 🚀 快速开始

### 本地开发环境
```bash
cd web
npm install
npm run dev  # 启动开发服务器，热重载
```
访问: `http://localhost:3000`
- 支持热重载和实时预览
- 包含开发工具和调试信息
- 仅用于本地开发和测试

### 生产部署环境
```bash
# 构建生产版本
cd web
npm run build

# 然后部署到 Vercel/Netlify/云服务器
```
访问: `https://your-domain.com`
- 优化构建，移除开发代码
- CDN 加速，HTTPS 加密
- 适合线上访问

### 部署前端
参考 `FRONTEND-DEPLOYMENT-GUIDE.md` 部署到云服务器。

### 后端 API
后端已部署到云平台，API 地址：
- 发送弹幕: `https://k71otivpmn.sealoshzh.site/send-danmaku`
- 获取弹幕: `https://k71otivpmn.sealoshzh.site/get-danmaku`

## 📚 详细文档

- [前端资源替换指南](FRONTEND-ASSETS-GUIDE.md) - 详细说明如何自定义网站内容
- [前端部署指南](FRONTEND-DEPLOYMENT-GUIDE.md) - 云服务器部署教程
- [完整部署指南](DEPLOYMENT.md) - 全栈部署参考
- [快速开始指南](QUICKSTART.md) - 5分钟上手

## 🎯 功能特色

- ✅ 现代化响应式设计
- ✅ 黑板风格弹幕留言系统
- ✅ 云平台 API 集成
- ✅ SEO 优化
- ✅ TypeScript 支持
- ✅ Tailwind CSS 样式

## 🔧 技术栈

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: 云平台函数 (Laf.js)
- **Database**: 云平台 MongoDB
- **Deployment**: Nginx/Apache + 云服务器

## 📞 关于后端

**重要说明**: `server/` 目录中的后端函数代码已经部署到云开发平台，前端直接调用云平台的 API。无需在本地运行后端服务。

如果需要修改后端逻辑，请在云开发平台上更新相应的函数。

