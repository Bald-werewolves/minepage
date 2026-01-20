interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  // 将markdown内容转换为HTML的简单处理
  const renderContent = (markdown: string) => {
    // 简单的markdown到HTML转换
    return markdown
      .split('\n')
      .map((line, index) => {
        // 标题
        if (line.startsWith('# ')) {
          return `<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">${line.substring(2)}</h1>`
        }
        if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">${line.substring(3)}</h2>`
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold text-gray-900 mt-4 mb-2">${line.substring(4)}</h3>`
        }

        // 空行
        if (line.trim() === '') {
          return '<br />'
        }

        // 代码块
        if (line.startsWith('```')) {
          const language = line.substring(3)
          return `<pre class="bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-gray-800">${language}</code></pre>`
        }

        // 段落
        if (line.trim()) {
          return `<p class="text-gray-700 leading-relaxed mb-4">${line}</p>`
        }

        return ''
      })
      .join('')
  }

  return (
    <article className="prose prose-lg max-w-none">
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: renderContent(content)
        }}
      />
    </article>
  )
}
