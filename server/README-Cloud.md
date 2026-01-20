# 云开发平台集成指南

## Sealos Cloud 配置示例

### 假设 Sealos Cloud 使用类似 MongoDB 的 API：

```typescript
// send-danmaku.ts
import { MongoClient } from 'mongodb';

// 或使用 Sealos Cloud 提供的 SDK
// import cloud from '@sealos/cloud';

export async function main(ctx: FunctionContext) {
  // 连接数据库
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('minepage');

  const { name, email, message } = ctx.body;

  // 校验...

  const danmakuData = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    timestamp: new Date(),
    ip: ctx.headers['x-real-ip'] || 'unknown',
    userAgent: ctx.headers['user-agent'] || 'unknown',
    approved: true,
    status: 'active'
  };

  // 插入数据
  const result = await db.collection('danmaku').insertOne(danmakuData);

  await client.close();

  return {
    ok: true,
    msg: '留言发送成功！',
    data: { id: result.insertedId },
    code: 200
  };
}
```

### 如果 Sealos Cloud 有自己的 SDK：

```typescript
// send-danmaku.ts
import cloud from '@sealos/cloud';

export async function main(ctx: FunctionContext) {
  // 初始化
  cloud.init();

  // 获取数据库
  const db = cloud.database();

  const { name, email, message } = ctx.body;

  // ... 校验代码 ...

  const danmakuData = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    timestamp: new Date(),
    ip: ctx.headers['x-real-ip'] || 'unknown',
    userAgent: ctx.headers['user-agent'] || 'unknown',
    approved: true,
    status: 'active'
  };

  // 插入数据 - 确认实际 API
  const result = await db.collection('danmaku').insertOne(danmakuData);
  // 或: await db.collection('danmaku').add(danmakuData);

  return {
    ok: true,
    msg: '留言发送成功！',
    data: { id: result.id || result._id },
    code: 200
  };
}
```

### 1. 安装依赖
```bash
npm install @sealos/cloud
# 或根据 Sealos Cloud 文档安装相应 SDK
```

### 2. 修改导入和初始化
```typescript
// 根据 Sealos Cloud 的实际 SDK 调整
import cloud from '@sealos/cloud';
// 或
const cloud = require('@sealos/cloud');

// 初始化 - 根据文档调整
cloud.init({
  // 你的配置
});
```

### 3. 数据库操作
```typescript
// 获取数据库实例
const db = cloud.database();

// 集合操作 - 根据实际 API 调整
const collection = db.collection('danmaku');

// 插入数据
await collection.add(data);
// 或
await collection.insertOne(data);

// 查询数据
await collection.where({ approved: true }).get();
// 或
await collection.find({ approved: true });
```

## 常见云开发平台对比

### Tencent Cloud (微信云开发)
```javascript
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 使用
await db.collection('danmaku').add(data)
```

### Aliyun Cloud
```javascript
const cloud = require('@alicloud/fc')
const db = cloud.database()

// 使用
await db.collection('danmaku').insertOne(data)
```

### Sealos Cloud
```javascript
// 请根据 Sealos Cloud 文档调整
import cloud from '@sealos/cloud'
const db = cloud.database()

// 使用 - 需要确认实际 API
await db.collection('danmaku').add(data)
```

## 调试建议

1. **查看云平台文档** - 确认数据库 API 的确切格式
2. **检查初始化代码** - 确保云服务正确初始化
3. **测试简单操作** - 先测试基本的插入和查询
4. **查看错误日志** - 云平台的日志会显示具体的错误信息

## 当前代码模板

当前代码使用了通用的云开发模式，你需要根据 Sealos Cloud 的实际 API 进行调整：

1. 修改 `import cloud from '@sealos/cloud'` 为正确的导入
2. 调整 `cloud.init()` 的参数
3. 确认 `db.collection('danmaku').add()` 的正确语法
4. 调整结果检查逻辑

请参考 Sealos Cloud 的官方文档进行相应修改。
