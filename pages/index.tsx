import Head from 'next/head'
import VisuallyHidden from 'components/atoms/accessibility'
import CartLink from 'components/atoms/links/cart'
import SortBy from 'components/atoms/controls/selects/sort-by'
import ProductTile from 'components/molecules/tiles/product'
import Header from 'components/organisms/header'
import PageTemplate from 'components/templates/page'
import {
  Main,
  ProductsBar,
  Categories,
  Category,
  CategoryButton,
  ProductsHeading,
  Products,
} from './styled'

const Home = () => {
  return (
    <PageTemplate>
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <CartLink />
      </Header>
      <Main>
        <VisuallyHidden as="h1">Товары</VisuallyHidden>
        <section>
          <VisuallyHidden as="h2">Показать товары</VisuallyHidden>
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
    </PageTemplate>
  )
}

export default Home
