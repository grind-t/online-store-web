import Head from 'next/head'
import CartLink from 'components/atoms/links/cart'
import Header from 'components/organisms/header'
import ProductsView from 'components/organisms/products-view'
import PageTemplate from 'components/templates/page'
import { Main } from './styled'

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
        <ProductsView />
      </Main>
    </PageTemplate>
  )
}

export default Home
