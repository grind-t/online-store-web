import Head from 'next/head'
import pageStyles from 'styles/Page.module.css'

export default function Cart() {
  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Online store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={pageStyles.header}></header>
    </div>
  )
}
