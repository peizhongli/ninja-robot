import { useRef, useEffect } from 'react'
import markdownit from 'markdown-it'
import useTooltip from '@hooks/useTooltip'
import useClipboard from '@hooks/useClipboard'
import styles from './index.module.less'
import Loading from '@components/Loading'

const md = markdownit()
const ChatList = (props) => {
  const { list, onDelete } = props
  const chatListWrap = useRef(null)

  const { copyToClipboard } = useClipboard()

  const { show: showTooltip, clear: clearTooltip } = useTooltip({
    menus: ['复制', '删除'].map((i) => ({ title: i, key: i })),
    onSelect: (menuKey, key) => handleSelectMenu(menuKey, key)
  })

  const handleSelectMenu = (key, id) => {
    switch (key) {
      case '删除':
        onDelete(id)
        break
      case '复制':
        copyToClipboard(list.find((i) => i.id === id)?.content || '')
        break

      default:
        break
    }
    clearTooltip()
  }

  const scrollToBottom = () => {
    const wrapper = chatListWrap.current
    wrapper.scrollTop = wrapper.scrollHeight
  }

  useEffect(() => {
    window.setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, [list])

  const renderContent = (item) => {
    if (item.isLoading) {
      return <Loading />
    }
    return item.from === 'left' ? (
      <div dangerouslySetInnerHTML={{ __html: md.render(item.content) }} />
    ) : (
      item.content
    )
  }

  return (
    <ul className={styles.chatList} ref={chatListWrap}>
      {list.map((item) => (
        <li key={item.id} className={[styles.chatItem, styles[item.from]].join(' ')}>
          <div
            data-chat-key={item.id}
            data-time={item.time}
            className={styles.chatItemContent}
            onContextMenu={(e) => {
              e.stopPropagation()
              showTooltip(e, item.id)
            }}
          >
            {renderContent(item)}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ChatList
