import BlackboardDanmaku from '@/components/BlackboardDanmaku'
import MessageForm from '@/components/MessageForm'

export default function GuestbookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            留言板
          </h1>
          <p className="text-gray-300">
            欢迎留下你的足迹，让我们一起创造美好回忆
          </p>
        </div>

        {/* Blackboard Danmaku Section */}
        <div className="mb-12">
          <BlackboardDanmaku />
        </div>

        {/* Message Form Section */}
        <div className="max-w-2xl mx-auto">
          <MessageForm />
        </div>
      </div>
    </div>
  )
}
