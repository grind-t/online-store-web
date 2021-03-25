import { useSelect } from 'downshift'
import styles from './sort-by.module.css'

interface SortByProps {
  options: string[]
}

export default function SortBy({ options }: SortByProps) {
  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getLabelProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: options,
    defaultSelectedItem: options[0],
  })

  return (
    <div className={styles.sortBy}>
      <button type="button" className={styles.order}>
        <svg viewBox="0 0 11 7" fill="none" className={styles.orderIcon}>
          <path
            d="M10.9123 5.62624C10.9123 5.80093 10.8496 5.9521 10.7243 6.07976C10.5991 6.20742 10.4507 6.27125 10.2793 6.27125H1.41747C1.24604 6.27125 1.09768 6.20742 0.972402 6.07976C0.847124 5.9521 0.784485 5.80093 0.784485 5.62624C0.784485 5.45155 0.847124 5.30038 0.972402 5.17272L5.4033 0.657673C5.52858 0.530015 5.67694 0.466187 5.84837 0.466187C6.0198 0.466187 6.16816 0.530015 6.29344 0.657673L10.7243 5.17272C10.8496 5.30038 10.9123 5.45155 10.9123 5.62624Z"
            fill="#2C2C2C"
          />
        </svg>
      </button>
      <label className={styles.selectOptionLabel} {...getLabelProps()}>
        Сортировка по:
      </label>
      <button
        type="button"
        className={styles.selectOption}
        {...getToggleButtonProps()}
      >
        {selectedItem}
      </button>
      <ul className={styles.options} {...getMenuProps()}>
        {isOpen &&
          options.map((option, index) => (
            <li
              key={option}
              className={`${styles.option} ${
                highlightedIndex === index && styles.highlightedOption
              }`}
              {...getItemProps({ item: option, index })}
            >
              {option}
            </li>
          ))}
      </ul>
    </div>
  )
}
