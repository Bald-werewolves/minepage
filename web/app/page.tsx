import Link from 'next/link'
import { FaArrowRight, FaCode, FaPen, FaLightbulb } from 'react-icons/fa'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedPosts />

      {/* About section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              关于 MinePage
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              这是一个记录技术成长、生活感悟和创意想法的个人博客。
              这里汇聚了我对编程、设计、产品和生活的思考，希望能与更多志同道合的朋友交流学习。
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary-600">
                <FaCode className="h-12 w-12" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">技术分享</h3>
              <p className="mt-2 text-gray-600">
                分享编程经验、前端开发技巧、工具使用心得等技术内容
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary-600">
                <FaPen className="h-12 w-12" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">生活记录</h3>
              <p className="mt-2 text-gray-600">
                记录日常生活中的点滴感悟，分享个人成长经历
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-primary-600">
                <FaLightbulb className="h-12 w-12" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">创意想法</h3>
              <p className="mt-2 text-gray-600">
                分享有趣的产品思路、设计灵感和创新想法
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            开始阅读精彩内容
          </h2>
          <p className="mt-4 text-xl text-primary-100">
            探索更多技术文章和生活感悟
          </p>
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              查看全部文章
              <FaArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
