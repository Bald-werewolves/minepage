import Link from 'next/link'
import { FaCalendar, FaUser, FaTag } from 'react-icons/fa'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
}

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="card group cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <div className="card-content">
        {/* Category badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2 line-clamp-2">
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              <FaTag className="mr-1 h-3 w-3" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{post.tags.length - 3} 更多
            </span>
          )}
        </div>

        {/* Meta information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaUser className="mr-1 h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <FaCalendar className="mr-1 h-4 w-4" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  )
}
