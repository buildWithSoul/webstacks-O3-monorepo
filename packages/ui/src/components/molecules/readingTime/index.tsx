import Icon from "../../atoms/icon/icon"

interface ReadingTimeProps {
  content: any[]
  className?: string
}

export default function ReadingTime({ content, className = '' }: ReadingTimeProps) {
  const calculateReadingTime = (blocks: any[]) => {
    const wordsPerMinute = 200
    const text = blocks
      .filter(block => block._type === 'block')
      .map(block => 
        block.children?.map((child: any) => child.text).join(' ') || ''
      )
      .join(' ')
    
    const wordCount = text.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    
    return readingTime
  }

  const readingTime = calculateReadingTime(content)

  return (
    <div className={`flex items-center space-x-2 text-gray-500 ${className}`}>
      <Icon icon="clock" size={16} />
      <span className="text-sm">
        {readingTime} min read
      </span>
    </div>
  )
}