import { cloneElement, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { generateUUID } from '@utils'

const generateDiv = () => {
  const wrapper = document.createElement('div')
  document.body.appendChild(wrapper)
  return wrapper
}

const useExtraRender = (props = {}) => {
  const { generateContainer = generateDiv } = props
  const rootMap = useRef(new Map())

  const generate = (children) => {
    const wrap = generateContainer()
    const root = createRoot(wrap)
    const key = generateUUID()
    // 注册销毁函数
    const destroy = () => {
      root.unmount()
      document.body.removeChild(wrap)
      // 解除引用
      rootMap.current.delete(key)
    }
    // 渲染组件，如果传入的children是组件则为其注册destroy
    root.render(
      createPortal(
        cloneElement(children, {
          destroy
        }),
        wrap
      )
    )
    rootMap.current.set(key, destroy)
    return wrap
  }

  const destroy = (key) => {
    console.log('destroy!!')
    const cb = rootMap.current.get(key)
    cb && cb()
  }

  const clear = (roots = rootMap.current) => {
    for (const cb of roots.values()) {
      cb && cb()
    }
  }

  useEffect(() => {
    const allRoot = rootMap.current
    return () => {
      clear(allRoot)
    }
  }, [])

  return {
    generate,
    destroy,
    clear
  }
}

export default useExtraRender
