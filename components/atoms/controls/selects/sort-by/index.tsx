import VisuallyHidden from 'components/atoms/accessibility'
import { useSelect } from 'downshift'
import {
  Container,
  SortOrderButton,
  SortOrderIcon,
  Label,
  ToggleButton,
  Menu,
  Option,
} from './styled'

interface SortByProps {
  options: string[]
}

const SortBy = ({ options }: SortByProps) => {
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
    <Container>
      <SortOrderButton type="button">
        <SortOrderIcon />
        <VisuallyHidden>По возрастанию</VisuallyHidden>
      </SortOrderButton>
      <Label {...getLabelProps()}>Сортировка по:</Label>
      <ToggleButton type="button" {...getToggleButtonProps()}>
        {selectedItem}
      </ToggleButton>
      <Menu {...getMenuProps()}>
        {isOpen &&
          options.map((option, index) => (
            <Option
              highlighted={index === highlightedIndex}
              key={option}
              {...getItemProps({ item: option, index })}
            >
              {option}
            </Option>
          ))}
      </Menu>
    </Container>
  )
}

export default SortBy
export type { SortByProps }
