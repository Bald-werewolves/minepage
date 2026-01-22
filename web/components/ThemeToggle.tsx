'use client'

import { useEffect, useState } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 避免水合不匹配问题，只在客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // 服务端渲染时返回一个占位符，保持布局稳定
    return (
      <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800">
        <div className="h-5 w-5" />
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label={theme === 'light' ? '切换到暗色主题' : '切换到亮色主题'}
    >
      {theme === 'light' ? (
        <HiMoon className="h-5 w-5" />
      ) : (
        <HiSun className="h-5 w-5" />
      )}
    </button>
  )
}
