import { useSelect } from 'downshift'
import ArrowIcon from 'components/icons/arrow-icon'
import styled from 'styled-components'

export interface SortByProps {
  options: string[]
}

const OrderButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-right: 0.5rem;
`

const OrderIcon = styled(ArrowIcon)`
  display: block;
  width: 0.72rem;
`

const Label = styled.label`
  letter-spacing: 0.015em;
  line-height: 1.36;
  color: #2c2c2c;
  margin-right: 0.5rem;
`

const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  letter-spacing: 0.015em;
  line-height: 1.36;
  color: #fe5f1e;
  border-bottom: 1px dashed #fe5f1e;
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
  letter-spacing: 0.05em;

  &:focus,
  &:active {
    outline: none;
  }
`

const Option = styled.li`
  padding: 0.72rem 2.14rem 0.72rem 1.07rem;

  &:first-of-type {
    margin-top: 0.72rem;
  }
  &:last-of-type {
    margin-bottom: 0.72rem;
  }
`

const HighlightedOption = styled(Option)`
  background: rgba(254, 95, 30, 0.05);
  color: #fe5f1e;
`

const StyledSortBy = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
`

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
        <span className="sr-only">По возрастанию</span>
      </OrderButton>
      <Label {...getLabelProps()}>Сортировка по:</Label>
      <ToggleButton type="button" {...getToggleButtonProps()}>
        {selectedItem}
      </ToggleButton>
      <Menu {...getMenuProps()}>
        {isOpen &&
          options.map((option, index) =>
            highlightedIndex === index ? (
              <HighlightedOption
                key={option}
                {...getItemProps({ item: option, index })}
              >
                {option}
              </HighlightedOption>
            ) : (
              <Option key={option} {...getItemProps({ item: option, index })}>
                {option}
              </Option>
            )
          )}
      </Menu>
    </StyledSortBy>
  )
}

export default SortBy
