import { useState } from 'react'
import dayjs from 'dayjs'
import { generateUUID } from '@utils'
import { postMessage } from '@api'

const HISTORY_KEY = 'HISTORY'
const useChatList = () => {
  const [chatList, setChatList] = useState([])
  const [loading, setLoading] = useState(false)

  const getHistory = (length) => {
    const allMessage = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
    return length ? allMessage.slice(0 - length) : allMessage
  }

  const updateHistory = (id, content) => {
    const old = getHistory()
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(old.map((item) => (item.id === id ? { ...item, content } : item)))
    )
  }

  const deleteHistory = (id) => {
    const old = getHistory()
    localStorage.setItem(HISTORY_KEY, JSON.stringify(old.filter((i) => i.id !== id)))
  }

  const pushHistory = (content) => {
    const old = getHistory()
    localStorage.setItem(HISTORY_KEY, JSON.stringify([...old, content]))
  }

  const showHistory = () => {
    const history = getHistory(20)
    if (history.length) {
      setChatList(history)
    } else {
      setChatList([
        {
          from: 'left',
          content: 'Hello world!',
          time: dayjs().format('YYYY-MM-DD HH:mm'),
          id: +new Date()
        }
      ])
    }
  }

  const pushChat = (content, from) => {
    const id = generateUUID()
    const isLoading = content === false
    const message = {
      from,
      content: isLoading ? '这个回答去火星了TnT' : content,
      time: dayjs().format('YYYY-MM-DD HH:mm'),
      id
    }
    setChatList((v) => [...v, { ...message, isLoading }])
    pushHistory(message)
    return id
  }

  const updateItem = (id, content) => {
    setChatList((v) =>
      // eslint-disable-next-line no-unused-vars
      v.map(({ isLoading, ...item }) => (item.id === id ? { ...item, content } : item))
    )
    updateHistory(id, content)
  }

  const deleteChat = (id) => {
    setChatList((v) => v.filter((i) => i.id !== id))
    deleteHistory(id)
  }

  const pushChatLeft = (content) => pushChat(content, 'left')

  const pushChatRight = (content) => pushChat(content, 'right')

  const fetchPostMessage = async (text) => {
    setLoading(true)
    const id = pushChatLeft(false)
    const answer = await postMessage(text)
    setLoading(false)
    updateItem(id, answer)
  }

  const sendChat = (content) => {
    pushChatRight(content)
    fetchPostMessage(content)
  }

  return {
    chatList,
    pushChatLeft,
    pushChatRight,
    sendChat,
    deleteChat,
    showHistory,
    loading
  }
}
export default useChatList
