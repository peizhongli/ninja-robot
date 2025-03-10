import styles from './index.module.less'

const circles = Array.from({ length: 3 }, (_, index) => (
  <span key={index} className={styles.loading}></span>
))

const Loading = () => {
  return <div className={styles.loadingWrap}>{circles}</div>
}

export default Loading
