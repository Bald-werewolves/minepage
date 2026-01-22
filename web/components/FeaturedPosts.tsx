import Link from 'next/link'
import { FaCalendar, FaUser } from 'react-icons/fa'

const featuredPosts = [
  {
    id: '1',
    title: 'React 18 新特性详解',
    excerpt: '探索 React 18 带来的并发特性、Suspense、自动批处理等新功能，以及它们如何改变我们的开发体验。',
    author: 'MinePage',
    date: '2024-01-15',
    readTime: '8 min read',
    category: '前端开发',
    image: '/api/placeholder/400/250',
  },
  {
    id: '2',
    title: 'TypeScript 最佳实践指南',
    excerpt: '分享在大型项目中使用 TypeScript 的经验，包括类型定义、泛型使用、配置优化等方面的实用技巧。',
    author: 'MinePage',
    date: '2024-01-10',
    readTime: '12 min read',
    category: '编程语言',
    image: '/api/placeholder/400/250',
  },
  {
    id: '3',
    title: '现代 CSS 布局技巧',
    excerpt: '介绍 Flexbox、Grid、Container Queries 等现代 CSS 布局技术，以及如何在实际项目中应用它们。',
    author: 'MinePage',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'CSS',
    image: '/api/placeholder/400/250',
  },
]

export default function FeaturedPosts() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            推荐文章
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            精选优质内容，涵盖技术分享和生活感悟
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <article key={post.id} className="card group cursor-pointer">
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                {/* Placeholder for image */}
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">{post.category}</span>
                </div>
              </div>
              <div className="card-content">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <FaCalendar className="mr-1 h-4 w-4" />
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-2">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FaUser className="mr-1 h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
                  >
                    阅读更多 →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="btn btn-secondary"
          >
            查看全部文章
          </Link>
        </div>
      </div>
    </section>
  )
}
