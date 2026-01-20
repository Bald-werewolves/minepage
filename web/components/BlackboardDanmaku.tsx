'use client'

import { useEffect, useState } from 'react'

// 颜色数组，用于随机分配给留言
const colors = [
  "text-yellow-300",
  "text-green-300",
  "text-blue-300",
  "text-pink-300",
  "text-purple-300",
  "text-orange-300",
  "text-cyan-300",
  "text-red-300"
]

interface DanmakuMessage {
  id: number
  text: string
  author: string
  color: string
  top: number
  duration: number
  delay: number
}

export default function BlackboardDanmaku() {
  const [messages, setMessages] = useState<DanmakuMessage[]>([])

  const loadMessages = async () => {
    try {
      // 直接调用云平台API获取弹幕数据
      const response = await fetch('https://k71otivpmn.sealoshzh.site/get-danmaku?limit=20&offset=0')
      const result = await response.json()

      if (result.ok) {
        const messagesToShow = result.data

        // 如果没有留言，使用一些示例留言
        if (messagesToShow.length === 0) {
          messagesToShow.push(
            { id: 1, message: "欢迎来到 MinePage 的留言板！", name: "MinePage", timestamp: new Date().toISOString() },
            { id: 2, message: "这里可以看到大家的留言哦~", name: "访客", timestamp: new Date().toISOString() },
            { id: 3, message: "快来留下你的足迹吧！", name: "系统", timestamp: new Date().toISOString() }
          )
        }

        // 转换为弹幕格式
        const danmakuMessages: DanmakuMessage[] = messagesToShow.map((msg: any, index: number) => ({
          id: msg.id,
          text: msg.message,
          author: msg.name,
          color: colors[Math.floor(Math.random() * colors.length)],
          top: Math.random() * 80 + 10, // 随机高度 10%-90%
          duration: Math.random() * 10 + 15, // 随机持续时间 15-25秒
          delay: index * 1.5, // 错开显示时间
        }))

        setMessages(danmakuMessages)
      } else {
        console.error('获取弹幕失败:', result.error)
        // 如果API失败，回退到本地存储
        fallbackToLocalStorage()
      }
    } catch (error) {
      console.error('获取弹幕错误:', error)
      // 如果API失败，回退到本地存储
      fallbackToLocalStorage()
    }
  }

  const fallbackToLocalStorage = () => {
    // 回退到本地存储
    const storedMessages = JSON.parse(localStorage.getItem('guestbook-messages') || '[]')

    const messagesToShow = storedMessages.length > 0 ? storedMessages.slice(0, 10) : [
      { id: 1, message: "欢迎来到 MinePage 的留言板！", name: "MinePage", timestamp: new Date().toISOString() },
      { id: 2, message: "这里可以看到大家的留言哦~", name: "访客", timestamp: new Date().toISOString() },
      { id: 3, message: "快来留下你的足迹吧！", name: "系统", timestamp: new Date().toISOString() },
    ]

    const danmakuMessages: DanmakuMessage[] = messagesToShow.map((msg: any, index: number) => ({
      id: msg.id,
      text: msg.message,
      author: msg.name,
      color: colors[Math.floor(Math.random() * colors.length)],
      top: Math.random() * 80 + 10,
      duration: Math.random() * 10 + 15,
      delay: index * 2,
    }))

    setMessages(danmakuMessages)
  }

  useEffect(() => {
    // 初始加载留言
    loadMessages()

    // 监听留言提交事件
    const handleMessageSubmitted = () => {
      loadMessages()
    }

    window.addEventListener('messageSubmitted', handleMessageSubmitted)

    // 每隔一段时间刷新弹幕（模拟新留言）
    const interval = setInterval(() => {
      loadMessages()
    }, 10000) // 每10秒刷新一次

    return () => {
      window.removeEventListener('messageSubmitted', handleMessageSubmitted)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-2xl border-4 border-yellow-600 overflow-hidden">
      {/* Blackboard texture effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Chalk marks effect */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-yellow-400 rounded opacity-20"></div>

      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <h2 className="text-2xl font-bold text-yellow-400 text-center drop-shadow-lg">
          ✏️ 留言墙 ✏️
        </h2>
        <p className="text-sm text-yellow-300 text-center mt-1">
          大家的美好留言
        </p>
      </div>

      {/* Danmaku messages */}
      <div className="absolute inset-0 overflow-hidden">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`absolute whitespace-nowrap ${message.color} text-lg font-medium drop-shadow-lg`}
            style={{
              top: `${message.top}%`,
              animation: `danmaku ${message.duration}s linear ${message.delay}s infinite`,
            }}
          >
            <span className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
              {message.text} — {message.author}
            </span>
          </div>
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
      <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>

      <style jsx>{`
        @keyframes danmaku {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
