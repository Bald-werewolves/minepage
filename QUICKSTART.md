# MinePage 快速开始指南

## 🚀 5分钟内启动留言功能

### 步骤1: 启动前端开发服务器
```bash
cd web
npm install
npm run dev
```
访问: `http://localhost:3000/guestbook`

### 步骤2: 测试留言功能
1. 打开留言板页面
2. 填写表单并提交留言
3. 看到留言在黑板上弹幕显示

### 步骤3: 部署后端 (可选)
如果想让留言永久保存：

1. **注册 Laf.js**: https://laf.run/
2. **部署后端函数**:
   ```bash
   cp server/*.js your-laf-project/
   laf deploy
   ```
3. **初始化数据库**:
   ```bash
   curl -X POST https://your-app.laf.run/init-database
   ```
4. **配置前端**:
   ```bash
   # web/.env.local
   LAF_BASE_URL=https://your-app.laf.run
   ```

## 🎯 核心功能

### 黑板弹幕效果
- 留言从右向左飘过
- 随机颜色和速度
- 实时更新显示

### 留言表单
- 姓名、邮箱、内容验证
- 毛玻璃现代化设计
- 发送状态反馈

### 数据存储
- 本地存储 (开发测试)
- Laf.js + MongoDB (生产环境)

## 📁 项目结构

```
minepage/
├── web/                    # Next.js 前端
│   ├── app/
│   │   ├── api/           # API 路由
│   │   ├── guestbook/     # 留言页面
│   │   └── components/    # React 组件
├── server/                 # Laf.js 后端
│   ├── send-danmaku.js    # 发送弹幕
│   ├── get-danmaku.js     # 获取弹幕
│   └── init-database.js   # 数据库初始化
└── DEPLOYMENT.md          # 完整部署指南
```

## 🔧 开发模式 vs 生产模式

### 开发模式 (本地存储)
- ✅ 无需配置数据库
- ✅ 立即可用
- ✅ 适合测试
- ❌ 数据不持久

### 生产模式 (Laf.js)
- ✅ 数据永久保存
- ✅ 高可用性
- ✅ 自动扩展
- ⚠️ 需要配置

## 🎨 自定义留言功能

### 修改弹幕样式
```typescript
// web/components/BlackboardDanmaku.tsx
const colors = [
  "text-red-300",    // 添加更多颜色
  "text-blue-300",
  "text-green-300",
  // ...
];
```

### 调整弹幕速度
```typescript
// 修改持续时间范围
duration: Math.random() * 20 + 10, // 10-30秒
```

### 添加留言验证
```typescript
// server/send-danmaku.js
// 添加更多验证规则
if (message.includes('敏感词')) {
  return { error: '留言包含不当内容' }
}
```

## 🐛 常见问题

### Q: 留言提交后不显示？
A: 检查浏览器控制台是否有错误，确认API连接正常。

### Q: 弹幕动画卡顿？
A: 这是正常现象，CSS动画在低性能设备上可能不流畅。

### Q: 如何清空测试数据？
A: 本地存储数据：`localStorage.clear()`

### Q: Laf.js 部署失败？
A: 检查网络连接，确认代码语法正确。

## 📞 获取帮助

1. 查看 `README.md` 详细文档
2. 检查 `DEPLOYMENT.md` 部署指南
3. 浏览器 F12 查看控制台错误
4. Laf.js 控制台查看后端日志

## 🎉 享受你的留言板！

现在你可以：
- 🖊️ 接收访客留言
- 📺 观看弹幕动画
- 💾 永久保存数据 (生产模式)
- 🎨 自定义样式

祝你玩得开心！ 🚀
