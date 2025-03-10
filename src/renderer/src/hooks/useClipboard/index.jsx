import { useState } from 'react'

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)
      } else {
        // 不支持 Clipboard API，使用 document.execCommand('copy')
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return {
    copyToClipboard,
    isCopied
  }
}

export default useClipboard
