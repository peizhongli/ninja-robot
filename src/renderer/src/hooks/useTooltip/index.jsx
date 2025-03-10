import useExtraRender from '@hooks/useExtraRender'
import Tooltip from '@components/Tooltip'

const useTooltip = (options) => {
  const { generate, clear } = useExtraRender()

  const { menus, onSelect } = options

  const show = (e, key) => {
    // 先清空所有
    clear()
    // 再生成新的tooltip
    const { clientX, clientY } = e
    generate(
      <Tooltip
        clientX={clientX}
        clientY={clientY}
        content={menus}
        onSelect={(menuKey) => onSelect(menuKey, key)}
      />
    )
  }

  return { show, clear }
}

export default useTooltip
