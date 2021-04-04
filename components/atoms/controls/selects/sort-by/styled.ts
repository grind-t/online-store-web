import { font14 } from 'components/atoms/typography'
import ArrowIcon from 'components/atoms/icons/arrow'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
`

const SortOrderButton = styled.button`
  margin-right: 0.5rem;
  border: none;
  background: none;
`

const SortOrderIcon = styled(ArrowIcon)`
  display: block;
  width: 0.72rem;
`

const Label = styled.label`
  color: #2c2c2c;
  margin-right: 0.5rem;
  ${font14}
`

const ToggleButton = styled.button`
  border: none;
  border-bottom: 1px dashed #fe5f1e;
  background: none;
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

export {
  Container,
  SortOrderButton,
  SortOrderIcon,
  Label,
  ToggleButton,
  Menu,
  Option,
}
