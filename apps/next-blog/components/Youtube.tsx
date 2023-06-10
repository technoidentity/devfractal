import styles from '../styles/youtube.module.css'

// eslint-disable-next-line import/no-default-export
export default function YouTube({ id }: { id: string }) {
  return (
    <div className={styles['container']}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className={styles['frame']}
      />
    </div>
  )
}
