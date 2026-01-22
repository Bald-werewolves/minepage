import Link from 'next/link'
import { FaArrowDown } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            欢迎来到
            <span className="text-primary-600 dark:text-primary-400"> MinePage</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            一个专注于技术分享、生活记录和创意想法的个人博客。
            这里记录着我的学习历程、技术实践和生活感悟，希望能为你带来启发和帮助。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/blog"
              className="btn btn-primary text-base"
            >
              开始阅读
            </Link>
            <Link
              href="/about"
              className="btn btn-secondary text-base"
            >
              了解更多
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <div className="animate-bounce">
            <FaArrowDown className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#gradient)"
            fillOpacity=".3"
            d="m0 0 487.391 439.512 487.391-439.512H0z"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}
