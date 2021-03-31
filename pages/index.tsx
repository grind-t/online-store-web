import Head from 'next/head'
import Page, { Header } from 'components/pages/page'
import CartLink from 'components/links/cart-link'
import CategoryButton from 'components/controls/buttons/category-button'
import SortBy from 'components/controls/lists/sort-by'
import ProductTile from 'components/tiles/product-tile'
import { Heading } from 'components/typography'
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

const Home = () => {
  return (
    <Page>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <CartLink />
      </Header>
      <Main>
        <h1 className="sr-only">Товары</h1>
        <section>
          <h2 className="sr-only">Показать товары</h2>
          <ProductsBar>
            <Categories>
              <Category>
                <CategoryButton>Все</CategoryButton>
              </Category>
              <Category>
                <CategoryButton>Playstation Plus</CategoryButton>
              </Category>
            </Categories>
            <SortBy options={['популярности', 'цене', 'алфавиту']} />
          </ProductsBar>
        </section>
        <section>
          <ProductsHeading>Все товары</ProductsHeading>
          <Products>
            <ProductTile />
            <ProductTile />
          </Products>
        </section>
      </Main>
    </Page>
  )
}

export default Home
