import { useSelect } from 'downshift'
import { font14 } from 'components/typography'
import Accessible from 'components/accessibility'
import ArrowIcon from 'components/icons/arrow-icon'
import Button from 'components/controls/buttons/button'
import styled from 'styled-components'

const OrderButton = styled(Button)`
  margin-right: 0.5rem;
`

const OrderIcon = styled(ArrowIcon)`
  display: block;
  width: 0.72rem;
`

const Label = styled.label`
  color: #2c2c2c;
  margin-right: 0.5rem;
  ${font14}
`

const ToggleButton = styled(Button)`
  border-radius: 0;
  border-bottom: 1px dashed #fe5f1e;
  color: #fe5f1e;
  ${font14}
`

const Menu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  top: 1.79rem;
  right: 0;
  background: #ffffff;
  box-shadow: 0px 0.36rem 1.07rem rgba(0, 0, 0, 0.09);
  border-radius: 0.71rem;

  &:focus,
  &:active {
    outline: none;
  }
`

const Option = styled.li<{ highlighted: boolean }>`
  padding: 0.72rem 2.14rem 0.72rem 1.07rem;
  ${(props) => props.highlighted && 'background: rgba(254, 95, 30, 0.05);'}
  ${(props) => props.highlighted && 'color: #fe5f1e;'}
  ${font14}

  &:first-of-type {
    margin-top: 0.72rem;
  }
  &:last-of-type {
    margin-bottom: 0.72rem;
  }
`

const StyledSortBy = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
`

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
    <StyledSortBy>
      <OrderButton type="button">
        <OrderIcon />
        <Accessible>По возрастанию</Accessible>
      </OrderButton>
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
    </StyledSortBy>
  )
}

export default SortBy
export type { SortByProps }
