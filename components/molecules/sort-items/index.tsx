import VisuallyHidden from 'components/atoms/accessibility'
import { useUID } from 'react-uid'
import { useSelect } from 'downshift'
import {
  Container,
  SortOrderButton,
  SortOrderIcon,
  Label,
  ToggleButton,
  Menu,
  Item,
} from './styled'

interface SortItemsProps {
  filters: string[]
  filter?: string
  ascending?: boolean
  onFilterChange?: (value: string) => void
  onOrderChange?: () => void
}

const SortItems = ({
  filters,
  filter,
  ascending,
  onFilterChange,
  onOrderChange,
}: SortItemsProps) => {
  const uid = useUID()
  const {
    isOpen,
    highlightedIndex,
    getLabelProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    id: uid,
    items: filters,
    onSelectedItemChange: ({ selectedItem }) =>
      onFilterChange && onFilterChange(selectedItem),
  })

  return (
    <Container>
      <SortOrderButton
        ascending={ascending}
        type="button"
        onClick={onOrderChange}
      >
        <SortOrderIcon />
        <VisuallyHidden>По возрастанию</VisuallyHidden>
      </SortOrderButton>
      <Label {...getLabelProps()}>Сортировка по:</Label>
      <ToggleButton type="button" {...getToggleButtonProps()}>
        {filter}
      </ToggleButton>
      <Menu {...getMenuProps()}>
        {isOpen &&
          filters.map((v, i) => (
            <Item
              highlighted={i === highlightedIndex}
              key={v}
              {...getItemProps({ item: v, index: i })}
            >
              {v}
            </Item>
          ))}
      </Menu>
    </Container>
  )
}

export default SortItems
export type { SortItemsProps }
