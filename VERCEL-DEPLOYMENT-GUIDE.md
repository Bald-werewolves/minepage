# MinePage Vercel 部署完整指南

本文档提供将 MinePage 前端项目部署到 Vercel 的详细教程。Vercel 是 Next.js 的官方部署平台，提供最佳的性能和开发体验。

## 🎯 为什么选择 Vercel？

- ✅ **Next.js 官方支持** - 最佳的 Next.js 部署体验
- ✅ **自动 HTTPS** - 免费 SSL 证书
- ✅ **全球 CDN** - 快速的内容分发
- ✅ **预览部署** - 每个提交自动生成预览
- ✅ **Git 集成** - 支持 GitHub、GitLab、Bitbucket
- ✅ **免费额度充足** - 个人项目完全免费

## 📋 前置要求

### 账户准备
- [ ] GitHub 账户（用于代码托管）
- [ ] Vercel 账户（[vercel.com](https://vercel.com)）

### 项目准备
- [ ] MinePage 项目代码
- [ ] Git 仓库已创建

## 💻 本地开发 vs 生产部署

### 本地开发环境
```bash
cd web
npm install
npm run dev  # ← 这里是本地开发命令
```
- **用途**: 开发和测试
- **访问**: http://localhost:3000
- **特点**: 热重载、开发工具、调试信息

### 生产部署环境
```bash
# Vercel 自动执行（无需手动）
npm install
npm run build  # 构建生产版本
```
- **用途**: 线上访问和发布
- **访问**: https://your-site.vercel.app
- **特点**: 优化构建、CDN 加速、自动 HTTPS

## 🚀 部署步骤

### 步骤1: 准备代码仓库

#### 1.1 创建 GitHub 仓库
1. 访问 [GitHub.com](https://github.com)
2. 点击 **"New repository"**
3. 填写仓库信息：
   - **Repository name**: `minepage` 或你喜欢的名称
   - **Description**: `Personal blog website with Next.js`
   - **Visibility**: Public（公开）或 Private（私有）
4. 点击 **"Create repository"**

#### 1.2 上传项目代码
```bash
# 初始化 Git 仓库（如果还没有）
cd /path/to/your/minepage/project
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: MinePage blog project"

# 添加远程仓库
git remote add origin https://github.com/yourusername/minepage.git

# 推送代码
git push -u origin main
```

### 步骤2: 连接 Vercel

#### 2.1 注册 Vercel 账户
1. 访问 [vercel.com](https://vercel.com)
2. 点击 **"Sign Up"** 注册账户
3. 使用 GitHub 账户快速注册（推荐）

#### 2.2 导入项目
1. 登录 Vercel 后，点击 **"New Project"**
2. 选择 **"Import Git Repository"**
3. 连接你的 GitHub 账户
4. 选择 `minepage` 仓库
5. 点击 **"Import"**

### 步骤3: 配置部署设置

#### 3.1 项目配置
在 Vercel 项目配置页面：

**基本信息**:
- **Project Name**: `minepage`（或自定义）
- **Framework Preset**: `Next.js`（自动检测）

**根目录**:
- **Root Directory**: `web`（因为我们的前端代码在 `web/` 文件夹）

#### 3.2 环境变量
由于我们的前端直接调用云平台 API，无需额外环境变量配置。

如果将来需要添加其他配置：
1. 点击 **"Environment Variables"**
2. 添加变量：
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-api-url.com`（如果需要）

#### 3.3 构建设置
Vercel 会自动检测 Next.js 项目，通常无需手动配置。

如需自定义：
- **Build Command**: `npm run build`
- **Output Directory**: `.next`（自动设置）
- **Install Command**: `npm install`

### 步骤4: 部署项目

#### 4.1 开始部署
1. 点击 **"Deploy"** 按钮
2. Vercel 会自动：
   - 克隆你的 GitHub 仓库
   - 安装依赖 (`npm install`)
   - 构建项目 (`npm run build`)
   - 部署到全球 CDN

#### 4.2 部署进度
部署过程中你会看到：
- ⏳ **Initializing** - 初始化
- ⏳ **Cloning** - 克隆代码
- ⏳ **Installing** - 安装依赖
- ⏳ **Building** - 构建项目
- ⏳ **Deploying** - 部署中
- ✅ **Ready** - 部署完成

### 步骤5: 配置域名（可选）

#### 5.1 添加自定义域名
1. 在 Vercel 项目页面，点击 **"Settings"** 标签
2. 点击 **"Domains"**
3. 点击 **"Add"**
4. 输入你的域名，例如：`blog.yourname.com`
5. 点击 **"Add"**

#### 5.2 DNS 配置
Vercel 会提供 DNS 配置说明：

**方法1: CNAME 记录**
```
类型: CNAME
主机记录: blog (或你的子域名)
记录值: cname.vercel-dns.com
TTL: 300
```

**方法2: A 记录** (根域名)
```
类型: A
主机记录: @
记录值: 76.76.21.21
TTL: 300
```

#### 5.3 SSL 证书
Vercel 会自动为你的域名申请免费的 Let's Encrypt SSL 证书，无需手动配置。

## 🔍 验证部署

### 6.1 检查网站
部署完成后，Vercel 会提供一个 `.vercel.app` 域名：
```
https://minepage.vercel.app
```

访问这个地址验证：
- ✅ 首页正常加载
- ✅ 导航菜单工作
- ✅ 博客页面正常
- ✅ 留言板功能正常

### 6.2 测试留言功能
1. 访问留言板页面
2. 填写留言表单
3. 提交留言
4. 验证弹幕是否显示

### 6.3 移动端测试
- 使用手机浏览器访问
- 检查响应式布局
- 测试触摸交互

## 📊 Vercel 控制台功能

### 项目管理
- **Deployments**: 查看所有部署历史
- **Functions**: 查看服务器端功能（如果有）
- **Analytics**: 访问统计和性能数据
- **Settings**: 项目配置和环境变量

### 部署管理
- **Redeploy**: 重新部署
- **Rollback**: 回滚到之前的版本
- **Domains**: 域名管理
- **Environment**: 环境变量管理

## 🔄 更新和维护

### 自动部署
一旦连接 GitHub，每当你推送代码到主分支，Vercel 会自动重新部署：
```bash
# 本地修改代码
git add .
git commit -m "Update blog content"
git push origin main

# Vercel 自动部署，无需手动操作
```

### 手动重新部署
1. 进入 Vercel 项目页面
2. 点击 **"Deployments"** 标签
3. 点击 **"Redeploy"** 按钮

### 分支预览
Vercel 为每个分支创建预览部署：
- `main` 分支 → 生产环境
- `develop` 分支 → 开发预览
- Pull Request → PR 预览

## 🎨 自定义域名和样式

### 域名配置
1. 在 Vercel 设置中添加域名
2. 更新 DNS 记录
3. 等待 SSL 证书生效（通常几分钟）

### 网站图标和 SEO
确保你的网站配置了：
- `web/public/favicon.ico` - 网站图标
- `web/app/layout.tsx` - 网站标题和描述

## 🚀 性能优化

### Vercel 自动优化
- ✅ **自动压缩** - Gzip/Brotli 压缩
- ✅ **图片优化** - Next.js Image 组件自动优化
- ✅ **CDN 分发** - 全球 200+ 个边缘节点
- ✅ **缓存策略** - 智能缓存头

### 额外优化
```javascript
// web/next.config.js
module.exports = {
  images: {
    domains: ['your-image-domain.com'],
  },
  // 启用 SWC 编译器
  swcMinify: true,
}
```

## 🔧 故障排除

### 常见问题

#### 1. 构建失败
```
错误：Build failed
```
**解决方案**:
- 检查 `web/package.json` 依赖
- 确认 Node.js 版本兼容性
- 查看 Vercel 构建日志

#### 2. 404 页面错误
```
错误：Page not found
```
**解决方案**:
- 检查 Next.js 路由配置
- 确认 `web/app/` 目录结构
- 查看 `web/next.config.js`

#### 3. API 调用失败
```
错误：Failed to fetch
```
**解决方案**:
- 确认云平台 API 地址正确
- 检查 CORS 设置
- 查看浏览器网络面板

#### 4. 样式不显示
```
错误：Tailwind CSS not working
```
**解决方案**:
- 检查 `web/tailwind.config.js`
- 确认 `web/app/globals.css` 导入
- 验证构建输出

### 调试工具

#### Vercel 日志
1. 进入项目 **"Deployments"** 页面
2. 点击具体的部署
3. 查看 **"Build Logs"** 和 **"Function Logs"**

#### 本地调试
```bash
# 本地构建测试
cd web
npm run build
npm run start

# 检查构建输出
ls -la .next/
```

## 📈 监控和分析

### Vercel Analytics
1. 在项目设置中启用 **"Analytics"**
2. 查看访问统计、性能指标
3. 分析用户行为

### 自定义监控
```javascript
// web/app/layout.tsx 中添加
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 💰 费用说明

### 免费额度
- ✅ **无限静态部署**
- ✅ **100GB 带宽/月**
- ✅ **100 个部署/月**
- ✅ **自动 HTTPS**
- ✅ **全球 CDN**

### 付费计划
如果超出免费额度：
- **Pro**: $20/月 - 更多带宽和功能
- **Enterprise**: 定制解决方案

## 🎉 完成部署！

恭喜！你已经成功将 MinePage 部署到 Vercel！

### 你的网站现在：
- 🌐 **全球可访问** - 通过 `.vercel.app` 域名
- 🔒 **HTTPS 加密** - 自动 SSL 证书
- ⚡ **高速加载** - 全球 CDN 加速
- 🔄 **自动更新** - 代码推送自动部署
- 📱 **移动友好** - 响应式设计

### 下一步：
1. 🎨 **定制内容** - 参考 `FRONTEND-ASSETS-GUIDE.md`
2. 🌐 **添加域名** - 配置自定义域名
3. 📊 **监控访问** - 查看 Vercel Analytics
4. 📝 **持续更新** - 推送代码自动部署

---

**需要帮助？**
- Vercel 官方文档: https://vercel.com/docs
- Next.js 部署指南: https://nextjs.org/docs/deployment
- 问题反馈: 在项目 Issues 中提出
