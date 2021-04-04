import { Heading, font18 } from 'components/atoms/typography'
import styled from 'styled-components'

const Main = styled.main`
  margin: 4.29rem 5.86rem 0 5.86rem;
`

const ProductsBar = styled.div`
  display: flex;
  align-items: center;
`

const Categories = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const Category = styled.li`
  display: inline-block;
  padding: 0;
  margin: 0;
`

const CategoryButton = styled.button`
  min-width: 5.93rem;
  padding: 0.8rem 1.07rem 0.8rem 1.43rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 7.14rem 4.29rem 4.29rem 2.14rem;
  background: #282828;
  color: white;
  ${font18}
`

const ProductsHeading = styled(Heading).attrs({
  as: 'h2',
  font: '32',
})`
  margin-top: 0.5rem;
`

const Products = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.57rem;
  margin-top: 6rem;
`

export {
  Main,
  ProductsBar,
  Categories,
  Category,
  CategoryButton,
  ProductsHeading,
  Products,
}
