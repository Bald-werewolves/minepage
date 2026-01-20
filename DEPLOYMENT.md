# MinePage 完整部署指南

本指南介绍如何完整部署 MinePage 个人博客网站，包括前端和后端留言功能。

## 📋 部署清单

### 前端部署 (Next.js)
- ✅ Next.js 14 项目
- ✅ TypeScript 配置
- ✅ Tailwind CSS 样式
- ✅ 响应式设计
- ✅ API 路由集成

### 后端部署 (Laf.js)
- ✅ 发送弹幕 API
- ✅ 获取弹幕 API
- ✅ 数据库初始化
- ✅ 数据验证和安全

### 数据库配置
- ✅ MongoDB 集合设计
- ✅ 索引优化
- ✅ 示例数据

## 🚀 部署步骤

### 步骤1: 部署后端服务 (Laf.js)

#### 1.1 注册 Laf.js 账号
1. 访问 [laf.run](https://laf.run/)
2. 注册账号并登录
3. 创建新应用

#### 1.2 上传后端函数
```bash
# 安装 Laf CLI
npm install -g @lafjs/cli

# 登录 Laf
laf login

# 创建项目
laf init minepage-backend

# 复制后端文件
cp server/*.js minepage-backend/

# 部署函数
laf deploy
```

#### 1.3 初始化数据库
```bash
# 调用初始化函数
curl -X POST https://your-app.laf.run/init-database
```

#### 1.4 记录后端 URL
```
LAF_BASE_URL=https://your-app.laf.run
```

### 步骤2: 配置前端环境

#### 2.1 环境变量配置
```bash
# 复制环境变量文件
cp web/.env.example web/.env.local

# 编辑环境变量
nano web/.env.local
```

```env
# web/.env.local
LAF_BASE_URL=https://your-app.laf.run
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-random-secret-key
```

#### 2.2 安装依赖
```bash
cd web
npm install
```

#### 2.3 构建项目
```bash
npm run build
```

### 步骤3: 部署前端应用

#### 选项1: Vercel (推荐)
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署
vercel --prod
```

#### 选项2: Netlify
```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 部署
netlify deploy --prod --dir=out
```

#### 选项3: 传统服务器
```bash
# 构建静态文件
npm run build
npm run export

# 上传 out/ 目录到服务器
```

## 🔧 配置说明

### Laf.js 配置
```javascript
// 环境变量 (在 Laf.js 控制台设置)
NODE_ENV=production
DANMAKU_MAX_LENGTH=500
DANMAKU_RATE_LIMIT=10
ADMIN_EMAIL=admin@minepage.com
```

### Next.js 配置
```javascript
// next.config.js
module.exports = {
  env: {
    LAF_BASE_URL: process.env.LAF_BASE_URL,
  },
  // API 路由配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.LAF_BASE_URL}/:path*`,
      },
    ]
  },
}
```

## 🧪 测试部署

### 1. 测试留言功能
```bash
# 发送测试留言
curl -X POST https://your-frontend-domain.com/api/send-danmaku \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "message": "这是一个测试留言"
  }'
```

### 2. 测试获取弹幕
```bash
# 获取弹幕列表
curl https://your-frontend-domain.com/api/get-danmaku?limit=10
```

### 3. 访问网站
- 前端: `https://your-frontend-domain.com`
- 留言板: `https://your-frontend-domain.com/guestbook`

## 📊 监控和维护

### Laf.js 监控
- 查看函数调用日志
- 监控数据库使用情况
- 设置告警规则

### 前端监控
- Vercel/Netlify 部署状态
- 错误日志收集
- 性能监控

### 数据库维护
```javascript
// 定期清理脚本 (在 Laf.js 中创建)
export async function main(ctx) {
  // 删除过期留言 (例如30天前)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  await db.collection('danmaku')
    .where({
      timestamp: db.lt(thirtyDaysAgo),
      status: 'active'
    })
    .update({ status: 'archived' })
}
```

## 🔒 安全配置

### 1. API 安全
- 添加请求频率限制
- 实施 CORS 策略
- 验证输入数据
- 添加请求签名

### 2. 数据库安全
- 定期备份数据
- 监控异常访问
- 设置访问权限
- 数据加密存储

### 3. 前端安全
- 使用 HTTPS
- 添加内容安全策略
- 防止 XSS 攻击
- 安全的表单处理

## 🚀 性能优化

### 后端优化
- 使用数据库索引
- 缓存频繁查询
- 分页查询优化
- 压缩响应数据

### 前端优化
- 静态资源优化
- 图片懒加载
- CDN 加速
- Service Worker 缓存

## 🔄 更新部署

### 更新后端
```bash
# 修改 server/*.js 文件
laf deploy
```

### 更新前端
```bash
# 修改 web/ 代码
npm run build
vercel --prod  # 或相应的部署命令
```

## 📞 故障排除

### 常见问题

1. **API 调用失败**
   - 检查 LAF_BASE_URL 配置
   - 确认 Laf.js 应用状态
   - 查看网络连接

2. **数据库连接错误**
   - 检查数据库权限
   - 确认集合名称
   - 查看连接字符串

3. **留言不显示**
   - 检查 approved 字段
   - 确认 status 为 'active'
   - 查看浏览器控制台错误

### 调试工具
- Laf.js 控制台日志
- 浏览器开发者工具
- MongoDB 数据库查看器

## 📚 相关资源

- [Laf.js 文档](https://laf.run/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [MongoDB 最佳实践](https://docs.mongodb.com/manual/best-practices)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

🎉 恭喜！你的 MinePage 个人博客网站现在已经完整部署，包括有趣的留言板功能！
