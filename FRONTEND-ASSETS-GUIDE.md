# MinePage 前端静态资源替换完整指南

本文档详细介绍如何在 MinePage 前端项目中替换和自定义各种静态资源，包括图片、图标、样式、文本内容等。

## 📁 项目结构概览

```
web/
├── public/                 # 静态资源目录
│   ├── favicon.ico        # 网站图标
│   └── images/            # 图片资源（需要创建）
├── app/
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局（网站标题、描述）
│   └── page.tsx           # 首页内容
├── components/            # React组件
│   ├── Header.tsx         # 导航栏
│   ├── Hero.tsx           # 首页英雄区域
│   ├── FeaturedPosts.tsx  # 推荐文章
│   ├── Footer.tsx         # 页脚
│   ├── BlogPostCard.tsx   # 博客卡片
│   ├── BlogContent.tsx    # 博客内容
│   ├── BlackboardDanmaku.tsx # 黑板弹幕
│   └── MessageForm.tsx    # 留言表单
└── README.md             # 项目文档
```

## 🎨 1. 网站基本信息替换

### 1.1 网站标题和描述

**文件**: `web/app/layout.tsx`

```typescript
// 当前内容（替换为你自己的信息）
export const metadata: Metadata = {
  title: 'MinePage - 个人博客',                    // 替换为你的网站标题
  description: '一个现代化的个人博客网站，分享技术、生活和思考', // 替换为你的网站描述
  keywords: '博客, 技术, 编程, 个人网站',             // 替换为你的关键词
}
```

**替换步骤**:
1. 打开 `web/app/layout.tsx` 文件
2. 修改 `title` 字段为你网站的标题
3. 修改 `description` 字段为你网站的描述
4. 修改 `keywords` 字段为你网站的关键词（用逗号分隔）

### 1.2 网站图标 (Favicon)

**文件**: `web/public/favicon.ico`

**替换步骤**:
1. 准备一张 32x32 或 16x16 像素的 ICO 格式图片
2. 将其命名为 `favicon.ico`
3. 替换 `web/public/favicon.ico` 文件
4. 如果你有其他格式（如 PNG），可以添加：
   ```html
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
   ```

### 1.3 网站名称和Logo

**文件**: `web/components/Header.tsx`

```typescript
// 当前内容
<Link href="/" className="text-2xl font-bold text-primary-600">
  MinePage  // 替换为你的网站名称
</Link>
```

**替换步骤**:
1. 打开 `web/components/Header.tsx`
2. 将 `MinePage` 替换为你的网站名称
3. 如果要添加 Logo 图片：
   ```typescript
   <Link href="/" className="flex items-center">
     <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
     <span className="text-2xl font-bold text-primary-600">你的网站名</span>
   </Link>
   ```

## 🎯 2. 首页内容替换

### 2.1 英雄区域内容

**文件**: `web/components/Hero.tsx`

```typescript
// 当前英雄区域内容
<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
  欢迎来到
  <span className="text-primary-600"> MinePage</span>  // 替换网站名称
</h1>
<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
  一个专注于技术分享、生活记录和创意想法的个人博客。  // 替换描述
  这里记录着我的学习历程、技术实践和生活感悟，希望能为你带来启发和帮助。
</p>
```

**替换步骤**:
1. 打开 `web/components/Hero.tsx`
2. 修改英雄标题中的网站名称
3. 修改描述文字为你自己的介绍
4. 可以修改按钮文字：
   ```typescript
   // 按钮文字
   查看全部文章  → 你的按钮文字
   了解更多     → 你的按钮文字
   ```

### 2.2 关于区域内容

**文件**: `web/app/page.tsx` (关于区域部分)

```typescript
// 当前关于区域内容
<section className="py-16 bg-gray-50">
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
      关于 MinePage  // 替换标题
    </h2>
    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
      这是一个记录技术成长、生活感悟和创意想法的个人博客。  // 替换描述
      这里汇聚了我对技术的思考、对生活的感悟，以及一些有趣的创意想法。
    </p>
  </div>
</section>
```

### 2.3 技能专长内容

**文件**: `web/app/page.tsx` (技能专长部分)

```typescript
// 当前技能内容
const skills = [
  {
    icon: FaCode,
    title: '前端开发',  // 替换技能标题
    description: '精通 React、Next.js、TypeScript 等现代前端技术栈', // 替换技能描述
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] // 替换技术列表
  },
  // ... 其他技能
]
```

**替换步骤**:
1. 修改每个技能对象的 `title`、`description`
2. 更新 `technologies` 数组为你掌握的技术
3. 可以添加或删除技能项

## 📝 3. 博客内容替换

### 3.1 示例博客文章

**文件**: `web/app/blog/page.tsx`

```typescript
// 当前示例文章
const blogPosts = [
  {
    id: '1',
    title: 'React 18 新特性详解',  // 替换文章标题
    excerpt: '探索 React 18 带来的并发特性...', // 替换文章摘要
    author: 'MinePage',  // 替换作者名
    date: '2024-01-15',   // 替换发布日期
    readTime: '8 min read', // 替换阅读时间
    category: '前端开发',    // 替换分类
    tags: ['React', 'JavaScript', '前端'], // 替换标签
  },
  // ... 更多文章
]
```

**替换步骤**:
1. 修改每篇文章的标题、摘要、作者、日期等信息
2. 更新分类和标签
3. 可以添加更多文章或删除示例文章

### 3.2 博客文章详情

**文件**: `web/app/blog/[id]/page.tsx`

```typescript
// 当前文章内容
const blogPosts = {
  '1': {
    title: 'React 18 新特性详解：并发特性与 Suspense', // 替换标题
    excerpt: '探索 React 18 带来的并发特性...',     // 替换摘要
    content: `
# React 18 新特性详解

React 18 为我们带来了许多激动人心的特性...

## 并发特性 (Concurrent Features)

React 18 的核心创新是并发渲染...
    `,
    // ... 其他字段
  }
}
```

## 🎨 4. 样式和颜色定制

### 4.1 主题颜色

**文件**: `web/tailwind.config.js`

```javascript
// 当前主题颜色
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // 主色调
    600: '#2563eb',  // 主要使用的颜色
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
}
```

**替换步骤**:
1. 选择你喜欢的主题颜色
2. 生成对应的色阶（可以使用在线工具如：https://tailwind.simey.me/）
3. 更新 `primary` 对象中的颜色值

### 4.2 字体设置

**文件**: `web/app/layout.tsx`

```typescript
// 当前字体
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// 使用字体
<body className={inter.className}>
```

**替换步骤**:
1. 从 Google Fonts 选择你喜欢的字体
2. 更新 import 语句
3. 修改字体变量名和使用方式

### 4.3 全局样式

**文件**: `web/app/globals.css`

```css
/* 可以在这里添加自定义样式 */
@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700;
    /* 添加你的自定义样式 */
  }
}
```

## 🖼️ 5. 图片资源替换

### 5.1 创建图片目录

```
web/public/
├── images/
│   ├── hero-background.jpg    # 英雄区域背景图
│   ├── profile-avatar.jpg     # 个人头像
│   ├── blog-post-1.jpg       # 博客文章配图
│   └── logo.png              # 网站Logo
```

### 5.2 在组件中使用图片

**Hero 组件背景图**:
```typescript
// web/components/Hero.tsx
<div
  className="hero-background"
  style={{
    backgroundImage: 'url(/images/hero-background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
```

**个人头像**:
```typescript
// web/components/Hero.tsx 或其他组件
<img
  src="/images/profile-avatar.jpg"
  alt="个人头像"
  className="w-32 h-32 rounded-full mx-auto mb-6"
/>
```

### 5.3 响应式图片

```typescript
<picture>
  <source media="(max-width: 768px)" srcSet="/images/hero-mobile.jpg" />
  <img src="/images/hero-desktop.jpg" alt="英雄区域" />
</picture>
```

## 🔗 6. 社交媒体链接替换

### 6.1 页脚社交链接

**文件**: `web/components/Footer.tsx`

```typescript
// 当前社交链接
const socialLinks = [
  {
    name: 'GitHub',
    href: '#',  // 替换为你的 GitHub 地址
    icon: FaGithub,
  },
  {
    name: 'Twitter',
    href: '#',  // 替换为你的 Twitter 地址
    icon: FaTwitter,
  },
  {
    name: 'LinkedIn',
    href: '#',  // 替换为你的 LinkedIn 地址
    icon: FaLinkedin,
  },
  {
    name: 'Email',
    href: 'mailto:contact@minepage.com', // 替换为你的邮箱
    icon: FaEnvelope,
  },
]
```

### 6.2 页脚版权信息

```typescript
// 当前版权信息
<p className="text-center text-sm text-gray-500">
  © 2024 MinePage. 保留所有权利.  // 替换为你的版权信息
</p>
```

## 📱 7. 移动端优化

### 7.1 响应式图片

确保所有图片都有合适的响应式设置：

```typescript
<img
  src="/images/hero.jpg"
  alt="英雄区域"
  className="w-full h-64 md:h-96 object-cover"
/>
```

### 7.2 移动端菜单

导航栏已经包含移动端适配，检查 `web/components/Header.tsx` 中的移动菜单部分。

## 🚀 8. 部署前检查清单

- [ ] 网站标题和描述已更新
- [ ] Favicon 已替换
- [ ] 网站名称已更改
- [ ] 首页内容已定制
- [ ] 技能专长已更新
- [ ] 示例文章已替换
- [ ] 主题颜色已调整
- [ ] 社交链接已配置
- [ ] 图片资源已添加
- [ ] 移动端显示正常

## 🔧 9. 常用工具和资源

### 颜色工具
- [Tailwind Color Generator](https://tailwind.simey.me/)
- [Coolors](https://coolors.co/)
- [Material Color Tool](https://material.io/design/color/)

### 图片优化
- [TinyPNG](https://tinypng.com/) - PNG/JPG 压缩
- [Squoosh](https://squoosh.app/) - 图片优化
- [Favicon Generator](https://favicon.io/)

### 图标库
- [React Icons](https://react-icons.github.io/react-icons/)
- [Heroicons](https://heroicons.com/)
- [Feather Icons](https://feathericons.com/)

### 字体资源
- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)

## 📞 技术支持

如果在替换过程中遇到问题，请检查：
1. 文件路径是否正确
2. 语法是否正确
3. 图片格式是否支持
4. Tailwind 类名是否正确

记得在修改后运行 `npm run dev` 查看效果！

