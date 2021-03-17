import Head from 'next/head'
import styles from '../styles/Page.module.css'

export default function Main() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Online store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
