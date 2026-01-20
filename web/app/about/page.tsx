import { FaCode, FaPalette, FaRocket, FaHeart, FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const skills = [
  {
    icon: FaCode,
    title: '前端开发',
    description: '精通 React、Next.js、TypeScript 等现代前端技术栈',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    icon: FaPalette,
    title: 'UI/UX 设计',
    description: '注重用户体验，追求简洁优雅的界面设计',
    technologies: ['Figma', 'Sketch', 'Adobe XD', '用户研究']
  },
  {
    icon: FaRocket,
    title: '性能优化',
    description: '关注应用性能，掌握各种优化技巧和最佳实践',
    technologies: ['Webpack', 'Vite', 'CDN', '缓存策略']
  },
  {
    icon: FaHeart,
    title: '技术分享',
    description: '热爱技术分享，乐于帮助他人共同成长',
    technologies: ['博客写作', '开源贡献', '技术演讲', '社区活动']
  }
]

const socialLinks = [
  {
    name: 'GitHub',
    href: '#',
    icon: FaGithub,
    description: '查看我的开源项目'
  },
  {
    name: 'Twitter',
    href: '#',
    icon: FaTwitter,
    description: '关注我的技术动态'
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: FaLinkedin,
    description: '了解我的职业经历'
  },
  {
    name: 'Email',
    href: 'mailto:contact@minepage.com',
    icon: FaEnvelope,
    description: '发送邮件联系我'
  },
]

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="text-center mb-16">
          <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-white">M</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            关于 MinePage
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            你好！我是 MinePage，一个热爱编程和分享的前端开发者。
            这里是我记录技术成长、生活感悟和创意想法的地方，希望能与你一起探索无限可能。
          </p>
        </div>

        {/* About content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">关于我</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              我是一名专注于前端开发的技术爱好者，对用户体验和代码质量有着执着的追求。
              在过去的几年里，我参与了多个大型项目的开发，从移动端应用到企业级系统，
              积累了丰富的实战经验。
            </p>
            <p className="mb-4">
              技术日新月异，我始终保持着学习的态度。无论是新兴的前端框架，
              还是经典的设计模式，我都乐于探索和实践。同时，我也相信技术不仅仅是工具，
              更是连接人与人的桥梁。
            </p>
            <p className="mb-4">
              在 MinePage，你会看到我对技术的思考、对生活的感悟，
              以及一些有趣的创意想法。我希望通过分享，能够帮助到更多的人，
              也期待与志同道合的朋友们交流学习。
            </p>
            <p>
              如果你对前端开发感兴趣，或者有任何问题想要讨论，
              欢迎通过社交媒体或邮件联系我。让我们一起成长，一起进步！
            </p>
          </div>
        </div>

        {/* Skills section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            技能专长
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <div key={skill.title} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="mx-auto h-12 w-12 text-primary-600 mb-4">
                  <skill.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {skill.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {skill.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            联系我
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            无论你是想讨论技术问题、寻求合作机会，还是只是想打个招呼，
            我都很乐意听到你的声音。选择你喜欢的方式联系我吧！
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-12 w-12 text-gray-400 group-hover:text-primary-600 transition-colors duration-200 mb-3">
                  <link.icon className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {link.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
