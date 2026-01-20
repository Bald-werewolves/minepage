# MinePage - 个人博客网站

一个现代化的个人博客网站，使用 Next.js 14、TypeScript 和 Tailwind CSS 构建。

## 功能特性

- 🚀 基于 Next.js 14 App Router
- ⚡ TypeScript 支持
- 🎨 Tailwind CSS 现代化样式
- 📱 完全响应式设计
- 🌙 优雅的 UI 组件
- 📝 Markdown 支持的博客文章
- 🔍 SEO 优化
- 🎯 优秀的用户体验

## 技术栈

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Data Storage**: Local Storage (前端演示)
- **Deployment**: 可部署到 Vercel、Netlify 等

## 本地开发

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 项目结构

```
web/
├── app/                    # Next.js App Router 目录
│   ├── about/             # 关于页面
│   ├── blog/              # 博客相关页面
│   │   ├── [id]/         # 博客文章详情页
│   │   └── page.tsx      # 博客列表页
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── components/            # React 组件
│   ├── BlogContent.tsx   # 博客内容组件
│   ├── BlogPostCard.tsx  # 博客卡片组件
│   ├── FeaturedPosts.tsx # 推荐文章组件
│   ├── Footer.tsx        # 页脚组件
│   ├── Header.tsx        # 头部导航组件
│   └── Hero.tsx          # 首页英雄区域组件
├── next.config.js        # Next.js 配置
├── package.json          # 项目依赖
├── postcss.config.js     # PostCSS 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── tsconfig.json         # TypeScript 配置
```

## 页面说明

### 首页 (`/`)
- 英雄区域介绍
- 推荐文章展示
- 网站简介和功能特色

### 博客列表页 (`/blog`)
- 文章分类筛选
- 文章卡片列表
- 分页功能

### 博客详情页 (`/blog/[id]`)
- 完整的文章内容
- 文章元信息（作者、日期、阅读时间等）
- 标签展示

### 留言板 (`/guestbook`)
- 黑板风格弹幕显示区
- 留言滚动显示效果
- 用户留言表单
- 本地存储留言数据
- 实时更新弹幕

### 关于页面 (`/about`)
- 个人简介
- 技能专长
- 联系方式

## 留言功能说明

留言功能支持前后端分离架构：

### 当前实现
- **前端**: React 组件 → 云平台 API
- **后端**: 云平台云函数，数据库
- **数据流**: 前端 → 云平台 API → 数据库 → 前端显示

### 功能特性
- ✅ 留言表单提交和验证
- ✅ 黑板弹幕实时显示留言
- ✅ 云平台数据持久化存储
- ✅ 自动刷新弹幕显示
- ✅ 错误处理和回退机制

### API 配置

前端直接调用云平台 API，无需环境变量配置：

#### 发送弹幕 (POST)
```javascript
const response = await fetch('https://k71otivpmn.sealoshzh.site/send-danmaku', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '访客姓名',
    email: 'user@example.com',
    message: '留言内容'
  })
});

const result = await response.json();
// result: { ok: true, msg: '留言发送成功！', data: {...} }
```

#### 获取弹幕 (GET)
```javascript
const response = await fetch('https://k71otivpmn.sealoshzh.site/get-danmaku?limit=20&offset=0');
const result = await response.json();
// result.data: [{ id, name, message, timestamp }, ...]
```

### 数据存储
- **数据库**: MongoDB (通过 Laf.js)
- **集合**: `danmaku`
- **索引**: 时间戳、状态、邮箱
- **备份**: 支持数据导出和恢复

### 部署后端

1. **复制后端文件** 到 Laf.js 项目：
   ```
   server/send-danmaku.js
   server/get-danmaku.js
   server/init-database.js
   ```

2. **运行数据库初始化**：
   ```bash
   POST /init-database
   ```

3. **配置环境变量**：
   ```env
   NODE_ENV=production
   DANMAKU_MAX_LENGTH=500
   DANMAKU_RATE_LIMIT=10
   ```

### 数据库设计

#### 弹幕文档结构
```json
{
  "_id": "ObjectId",
  "name": "访客姓名",
  "email": "user@example.com",
  "message": "留言内容",
  "timestamp": "2024-01-20T10:00:00.000Z",
  "ip": "192.168.1.1",
  "userAgent": "Chrome/120.0",
  "approved": true,
  "status": "active"
}
```

#### 数据库索引
- `{timestamp: -1}` - 时间排序查询
- `{status: 1, approved: 1}` - 状态过滤
- `{email: 1, timestamp: -1}` - 邮箱查询

### 安全措施
- 输入数据验证和清理
- 邮箱格式检查
- 长度限制 (2-500字符)
- IP地址记录
- 错误日志记录
- 速率限制 (可配置)

## 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### Netlify

1. 构建命令：`npm run build`
2. 发布目录：`out`
3. 部署设置完成

### 其他平台

对于其他部署平台，确保：
- 安装依赖：`npm install`
- 构建命令：`npm run build`
- 启动命令：`npm start`

## 自定义配置

### 修改网站信息

编辑 `app/layout.tsx` 中的 metadata：

```typescript
export const metadata: Metadata = {
  title: '你的网站名称',
  description: '你的网站描述',
}
```

### 修改主题颜色

在 `tailwind.config.js` 中自定义颜色：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#你的颜色',
        // ...
      },
    },
  },
}
```

### 添加新页面

1. 在 `app/` 目录下创建新文件夹
2. 添加 `page.tsx` 文件
3. 在 `components/Header.tsx` 中添加导航链接

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
