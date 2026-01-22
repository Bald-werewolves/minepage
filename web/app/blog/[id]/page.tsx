import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FaCalendar, FaUser, FaArrowLeft, FaShare, FaTag } from 'react-icons/fa'
import BlogContent from '@/components/BlogContent'

// 模拟博客文章数据
const blogPosts = {
  '1': {
    id: '1',
    title: 'React 18 新特性详解：并发特性与 Suspense',
    excerpt: '探索 React 18 带来的并发特性、Suspense、自动批处理等新功能，以及它们如何改变我们的开发体验。',
    author: 'MinePage',
    date: '2024-01-15',
    readTime: '8 min read',
    category: '前端开发',
    tags: ['React', 'JavaScript', '前端'],
    content: `
# React 18 新特性详解

React 18 为我们带来了许多激动人心的特性，其中最重要的是并发特性的引入。本文将深入探讨这些新特性及其对开发体验的影响。

## 并发特性 (Concurrent Features)

React 18 的核心创新是并发渲染 (Concurrent Rendering)。这意味着 React 可以在处理高优先级更新时中断低优先级更新，然后在适当的时候恢复。

### Suspense

Suspense 组件现在支持更多的用例，不仅仅是代码分割，还包括数据获取：

\`\`\`jsx
<Suspense fallback={<Loading />}>
  <ProfilePage />
</Suspense>
\`\`\`

### 自动批处理 (Automatic Batching)

在 React 18 中，所有的状态更新都会被自动批处理，即使是在异步函数、Promise、setTimeout 等情况下：

\`\`\`jsx
function handleClick() {
  setCount(c => c + 1); // 这不会立即触发重新渲染
  setFlag(f => !f);      // 这也不会立即触发重新渲染
  // React 18 会将这两个更新合并为一次渲染
}
\`\`\`

## 新的 API

### startTransition

用于将某些更新标记为非紧急的：

\`\`\`jsx
import { startTransition } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(term) {
    setSearchTerm(term);

    startTransition(() => {
      // 非紧急更新
      setSearchResults(searchData(term));
    });
  }
}
\`\`\`

### useDeferredValue

用于延迟某些值的更新：

\`\`\`jsx
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() =>
    searchItems(deferredQuery), [deferredQuery]
  );

  return (
    <ul>
      {results.map(item => <li key={item.id}>{item.text}</li>)}
    </ul>
  );
}
\`\`\`

## 迁移指南

### 从 React 17 升级

1. 更新 React 和 React DOM 到 18 版本
2. 将 \`render\` 替换为 \`createRoot\`
3. 可选：启用并发特性

### 注意事项

- StrictMode 在开发环境中会故意 double-invoke effects
- Suspense 边界现在可以嵌套
- Error boundaries 现在可以捕获 concurrent rendering 中的错误

## 总结

React 18 的并发特性为构建更流畅的用户界面提供了强大的工具。通过合理使用这些新特性，我们可以创建出响应更快、用户体验更好的应用程序。

虽然这些概念可能需要一些时间来适应，但它们代表了 React 朝着更现代化、更高性能的方向发展。
    `,
  },
  '2': {
    id: '2',
    title: 'TypeScript 最佳实践指南：大型项目经验分享',
    excerpt: '分享在大型项目中使用 TypeScript 的经验，包括类型定义、泛型使用、配置优化等方面的实用技巧。',
    author: 'MinePage',
    date: '2024-01-10',
    readTime: '12 min read',
    category: '编程语言',
    tags: ['TypeScript', '编程', '最佳实践'],
    content: `
# TypeScript 最佳实践指南

在大型项目中使用 TypeScript 可以显著提高代码质量和开发效率。本文分享一些实用的最佳实践和经验教训。

## 类型定义策略

### 接口 vs 类型别名

\`\`\`typescript
// 推荐使用接口来定义对象形状
interface User {
  id: number
  name: string
  email: string
}

// 对于联合类型或原始类型使用类型别名
type Status = 'active' | 'inactive' | 'pending'
type ID = string | number
\`\`\`

### 泛型使用

\`\`\`typescript
// API 响应的泛型接口
interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// 使用示例
interface User {
  id: number
  name: string
}

const response: ApiResponse<User> = {
  data: { id: 1, name: 'John' },
  message: 'Success',
  success: true
}
\`\`\`

## 配置优化

### tsconfig.json 最佳配置

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
\`\`\`

## 实用模式

### 条件类型

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T

type Example = NonNullable<string | null | undefined> // string
\`\`\`

### 映射类型

\`\`\`typescript
type Optional<T> = {
  [P in keyof T]?: T[P]
}

interface User {
  id: number
  name: string
  email: string
}

type OptionalUser = Optional<User>
// { id?: number, name?: string, email?: string }
\`\`\`

## 错误处理

### 自定义错误类型

\`\`\`typescript
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

class NetworkError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message)
    this.name = 'NetworkError'
  }
}

function handleError(error: Error) {
  if (error instanceof ValidationError) {
    console.log(\`Validation failed for field: \${error.field}\`)
  } else if (error instanceof NetworkError) {
    console.log(\`Network error with status: \${error.statusCode}\`)
  }
}
\`\`\`

## 总结

良好的 TypeScript 实践可以让大型项目更加可维护和可扩展。记住：

1. 使用严格模式
2. 合理定义接口和类型
3. 充分利用泛型
4. 编写可测试的代码
5. 保持类型定义的 DRY 原则

通过遵循这些最佳实践，你可以充分发挥 TypeScript 的优势，构建出高质量的应用程序。
    `,
  },
}

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.id as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            返回博客列表
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {post.excerpt}
          </p>

          {/* Article meta */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <FaUser className="mr-2 h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <FaCalendar className="mr-2 h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <span>{post.readTime}</span>
            </div>

            <button className="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              <FaShare className="h-5 w-5" />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <FaTag className="mr-1 h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article content */}
        <BlogContent content={post.content} />
      </div>
    </div>
  )
}
