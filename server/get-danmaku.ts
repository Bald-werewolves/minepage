import cloud from "@lafjs/cloud";

const db = cloud.database();

export async function main(ctx: FunctionContext) {
  const { limit = 20, offset = 0 } = ctx.query;

  // 校验参数
  const limitNum = parseInt(limit);
  const offsetNum = parseInt(offset);

  if (limitNum < 1 || limitNum > 100) {
    return { error: "limit参数应在1-100之间" };
  }

  if (offsetNum < 0) {
    return { error: "offset参数不能小于0" };
  }

  try {
    // 查询已批准且状态正常的弹幕，按时间倒序排列
    const { data: danmakuList } = await db.collection('danmaku')
      .where({
        approved: true,
        status: 'active'
      })
      .orderBy('timestamp', 'desc')
      .limit(limitNum)
      .skip(offsetNum)
      .get();

    // 获取总数
    const { total } = await db.collection('danmaku')
      .where({
        approved: true,
        status: 'active'
      })
      .count();

    // 处理数据，只返回前端需要的字段
    const processedData = danmakuList.map(item => ({
      id: item._id,
      name: item.name,
      message: item.message,
      timestamp: item.timestamp
    }));

    return {
      ok: true,
      data: processedData,
      pagination: {
        total,
        limit: limitNum,
        offset: offsetNum,
        hasMore: offsetNum + limitNum < total
      }
    };

  } catch (error) {
    console.error('获取弹幕错误:', error);
    return { error: "服务器内部错误，请稍后重试" };
  }
}
