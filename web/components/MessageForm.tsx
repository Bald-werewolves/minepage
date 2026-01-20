'use client'

import { useState } from 'react'
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from 'react-icons/fa'

interface FormData {
  name: string
  email: string
  message: string
}

export default function MessageForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 直接调用云平台API发送弹幕
      const response = await fetch('https://k71otivpmn.sealoshzh.site/send-danmaku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      const result = await response.json()

      if (result.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })

        // 触发页面刷新以显示新留言
        window.dispatchEvent(new CustomEvent('messageSubmitted'))

        // 3秒后重置状态
        setTimeout(() => setSubmitStatus('idle'), 3000)
      } else {
        throw new Error(result.error || '发送失败')
      }

    } catch (error) {
      console.error('发送留言错误:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          留下你的足迹
        </h2>
        <p className="text-gray-300">
          与我分享你的想法，或留下联系方式让我们保持联系
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            姓名 <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入你的姓名"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            邮箱 <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入你的邮箱"
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="relative">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            留言 <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <FaComment className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="写下你想对我说的话..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                发送中...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2 h-5 w-5" />
                发送留言
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
              ✅ 留言发送成功！感谢你的留言。
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
              ❌ 发送失败，请稍后再试。
            </div>
          </div>
        )}
      </form>

      {/* Privacy Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          你的个人信息将被妥善保护，仅用于回复留言和保持联系。
        </p>
      </div>
    </div>
  )
}
