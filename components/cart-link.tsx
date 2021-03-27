import Link from 'next/link'
import CartIcon from 'components/cart-icon'
import styles from './cart-link.module.css'

export default function CartLink() {
  return (
    <Link href="/cart">
      <a className={styles.cart}>
        <span className={styles.totalPrice}>520 ₽</span>
        <CartIcon stroke="white" strokeWidth="1.8" className={styles.icon} />
        <span className={styles.itemsCount}>3</span>
      </a>
    </Link>
  )
}
