import Link from 'next/link'
import { FaCalendar, FaUser, FaTag } from 'react-icons/fa'
import BlogPostCard from '@/components/BlogPostCard'

// 模拟博客文章数据
const blogPosts = [
  {
    id: '1',
    title: 'React 18 新特性详解：并发特性与 Suspense',
    excerpt: '探索 React 18 带来的并发特性、Suspense、自动批处理等新功能，以及它们如何改变我们的开发体验。深入理解这些新特性的工作原理和最佳实践。',
    author: 'MinePage',
    date: '2024-01-15',
    readTime: '8 min read',
    category: '前端开发',
    tags: ['React', 'JavaScript', '前端'],
  },
  {
    id: '2',
    title: 'TypeScript 最佳实践指南：大型项目经验分享',
    excerpt: '分享在大型项目中使用 TypeScript 的经验，包括类型定义、泛型使用、配置优化等方面的实用技巧。如何编写可维护的 TypeScript 代码。',
    author: 'MinePage',
    date: '2024-01-10',
    readTime: '12 min read',
    category: '编程语言',
    tags: ['TypeScript', '编程', '最佳实践'],
  },
  {
    id: '3',
    title: '现代 CSS 布局技巧：Flexbox、Grid 与 Container Queries',
    excerpt: '介绍 Flexbox、Grid、Container Queries 等现代 CSS 布局技术，以及如何在实际项目中应用它们。掌握响应式设计的核心技巧。',
    author: 'MinePage',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'CSS',
    tags: ['CSS', '布局', '响应式设计'],
  },
  {
    id: '4',
    title: 'Next.js 14 App Router 完全指南',
    excerpt: '深入了解 Next.js 14 的 App Router，掌握新的路由系统、Server Components、Streaming 等特性，提升你的全栈开发能力。',
    author: 'MinePage',
    date: '2024-01-01',
    readTime: '15 min read',
    category: '框架',
    tags: ['Next.js', 'React', '全栈开发'],
  },
  {
    id: '5',
    title: 'Tailwind CSS 实用技巧与设计系统构建',
    excerpt: '分享 Tailwind CSS 的高级用法，如何构建可复用的设计系统，以及在大型项目中的最佳实践和性能优化技巧。',
    author: 'MinePage',
    date: '2023-12-28',
    readTime: '11 min read',
    category: 'CSS',
    tags: ['Tailwind CSS', '设计系统', 'UI'],
  },
  {
    id: '6',
    title: 'JavaScript 异步编程进阶：Promise、Async/Await 与 Generator',
    excerpt: '深入理解 JavaScript 异步编程的核心概念，从回调地狱到 Promise，再到 Async/Await 和 Generator 的优雅解决方案。',
    author: 'MinePage',
    date: '2023-12-25',
    readTime: '14 min read',
    category: 'JavaScript',
    tags: ['JavaScript', '异步编程', 'Promise'],
  },
]

const categories = ['全部', '前端开发', '编程语言', 'CSS', '框架', 'JavaScript']

export default function BlogPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
            博客文章
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            分享技术见解、生活感悟和创意想法，与你一起探索无限可能
          </p>
        </div>

        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500 transition-colors duration-200"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog posts grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 cursor-not-allowed">
              上一页
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary-600 border border-primary-600">
              1
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              下一页
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
