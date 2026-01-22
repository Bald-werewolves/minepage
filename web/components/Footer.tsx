import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const socialLinks = [
  {
    name: 'GitHub',
    href: '#',
    icon: FaGithub,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: FaTwitter,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: FaLinkedin,
  },
  {
    name: 'Email',
    href: 'mailto:contact@minepage.com',
    icon: FaEnvelope,
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              MinePage
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              一个分享技术、生活和思考的个人博客。记录学习过程，分享经验见解，希望能与你一起成长。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              导航
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/guestbook" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  留言
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  关于
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              社交媒体
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 MinePage. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}
