import { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'

const Tooltip = (props) => {
  const { clientX, clientY, style, content, onSelect, destroy } = props
  const wrapRef = useRef(null)

  useEffect(() => {
    const listener = () => {
      destroy && destroy()
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  })

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.visibility = 'hidden'
      const tipWidth = wrapRef.current.scrollWidth
      const tipHeight = wrapRef.current.scrollHeight
      const overViewRight = clientX + tipWidth > window.innerWidth
      const overViewbottom = clientY + tipHeight > window.innerHeight

      if (overViewRight) {
        wrapRef.current.style.right = `8px`
      } else {
        wrapRef.current.style.left = `${clientX}px`
      }

      if (overViewbottom) {
        wrapRef.current.style.bottom = `8px`
      } else {
        wrapRef.current.style.top = `${clientY}px`
      }
      wrapRef.current.style.visibility = 'visible'
    }
  }, [])

  return (
    <ul className={styles.tooltip} style={style} ref={wrapRef} onClick={(e) => e.stopPropagation()}>
      {content.map((i) => (
        <li key={i.key} onClick={() => onSelect(i.key)}>
          {i.title}
        </li>
      ))}
    </ul>
  )
}

export default Tooltip
