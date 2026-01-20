import cloud from "@lafjs/cloud";

const db = cloud.database();

export async function main(ctx: FunctionContext) {
  const { name, email, message } = ctx.body;

  // 校验姓名、邮箱和留言内容是否为空
  if (!name || !email || !message) {
    return { error: "姓名、邮箱和留言内容不能为空" };
  }

  // 校验邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "邮箱格式不正确" };
  }

  // 校验留言长度
  if (message.length < 2 || message.length > 500) {
    return { error: "留言内容长度应在2-500字符之间" };
  }

  // 校验姓名长度
  if (name.length < 1 || name.length > 50) {
    return { error: "姓名长度应在1-50字符之间" };
  }

  try {
    // 创建留言数据
    const danmakuData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date(),
      ip: ctx.headers['x-real-ip'] || ctx.headers['x-forwarded-for'] || 'unknown',
      userAgent: ctx.headers['user-agent'] || 'unknown',
      approved: true, // 前端演示自动批准，可根据需要改为false需要审核
      status: 'active' // active, hidden, deleted
    };

    // 插入数据库
    const result = await db.collection('danmaku').add(danmakuData);

    if (!result.id) {
      return { error: "保存留言失败，请稍后重试" };
    }

    // 返回成功信息
    return {
      ok: true,
      msg: '留言发送成功！',
      data: {
        id: result.id,
        timestamp: danmakuData.timestamp
      }
    };

  } catch (error) {
    console.error('发送弹幕错误:', error);
    return { error: "服务器内部错误，请稍后重试" };
  }
}
