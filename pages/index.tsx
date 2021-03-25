import Head from 'next/head'
import Link from 'next/link'
import SortBy from 'components/sort-by'
import pageStyles from 'styles/page.module.css'
import styles from './index.module.css'

export default function Main() {
  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Online store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={pageStyles.header}>
        <Link href="/cart">
          <a className={styles.cart}>
            <span className={styles.cartTotalPrice}>520 ₽</span>
            <img
              src="/shopping-cart.svg"
              alt="Корзина"
              className={styles.cartIcon}
            />
            <span className={styles.cartItemsCount}>3</span>
          </a>
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.productsBar}>
          <button className={styles.productsBarButton}>Все</button>
          <button className={styles.productsBarButton}>Playstation Plus</button>
          <SortBy options={['популярности', 'цене', 'алфавиту']} />
        </div>
        <h1 className={styles.heading}>Все товары</h1>
      </main>
    </div>
  )
}
