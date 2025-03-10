import ChatList from '../ChatList'
import useChatList from '@hooks/useChatList'
import logo from '/deepseek-logo.png'
import styles from './index.module.less'
import { useEffect, useState } from 'react'

const ROBOT_NAME = 'DeepSeek'
const Entry = () => {
  const { chatList, deleteChat, sendChat, showHistory } = useChatList()
  const [inputValue, setInputValue] = useState('')

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      sendMes()
    }
  }

  const sendMes = () => {
    if (!inputValue.trim()) {
      return
    }
    sendChat(inputValue)
    setInputValue('')
  }

  useEffect(() => {
    showHistory()
  }, [])

  return (
    <div className={styles.chatWrap}>
      <h1 className={styles.chatTitle}>
        <img src={logo} />
        <span>{ROBOT_NAME}</span>
        <span className={styles.refresh} onClick={() => location.reload()}>
          刷新
        </span>
      </h1>
      <ChatList list={chatList} onDelete={deleteChat} />
      <div className={styles.chatInputWrap}>
        <textarea
          className={styles.chatInput}
          type="text"
          maxLength={140}
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <button
          title="发送"
          className={styles.sendBtn}
          disabled={!inputValue.trim()}
          onClick={sendMes}
        >
          ↑
        </button>
      </div>
    </div>
  )
}

export default Entry
