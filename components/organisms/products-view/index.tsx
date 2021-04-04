import VisuallyHidden from 'components/atoms/accessibility'
import SortBy from 'components/atoms/controls/selects/sort-by'
import ProductTile from 'components/molecules/tiles/product'
import {
  ViewOptions,
  Categories,
  Category,
  CategoryButton,
  ProductsHeading,
  Products,
} from './styled'

const ProductsView = () => {
  return (
    <>
      <VisuallyHidden as="h1">Товары</VisuallyHidden>
      <section>
        <VisuallyHidden as="h2">Показать товары</VisuallyHidden>
        <ViewOptions>
          <Categories>
            <Category>
              <CategoryButton>Все</CategoryButton>
            </Category>
            <Category>
              <CategoryButton>Playstation Plus</CategoryButton>
            </Category>
          </Categories>
          <SortBy options={['популярности', 'цене', 'алфавиту']} />
        </ViewOptions>
      </section>
      <section>
        <ProductsHeading>Все товары</ProductsHeading>
        <Products>
          <ProductTile />
          <ProductTile />
        </Products>
      </section>
    </>
  )
}

export default ProductsView
