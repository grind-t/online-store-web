import { Product } from 'api/products';
import CategoryList from 'components/products/category-list';
import ProductCard from 'components/products/product-card';
import Sorting from 'components/products/sorting';
import { HeadingLevel } from 'lib/accessibility';
import { Entities } from 'lib/entities';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';
import { useTranslations } from 'use-intl';

//#region styled
const ViewOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  & > * + * {
    margin: 15px 0 0 0;
  }

  @media ${up(breakpoints.md)} {
    flex-direction: row;
    margin-bottom: 20px;

    & > * + * {
      margin: 0 0 0 15px;
    }
  }

  @media ${up(breakpoints.xl)} {
    margin-bottom: 30px;
  }
`;

const ProductList = styled.ul`
  display: grid;
  grid-gap: 10px;
  gap: 10px;
  list-style: none;

  @media ${up(breakpoints.sm)} {
    grid-template-columns: repeat(auto-fill, minmax(290px, auto));
    grid-gap: 20px;
    gap: 20px;
  }

  @media ${up(breakpoints.md)} {
    grid-gap: 25px;
    gap: 25px;
  }

  @media ${up(breakpoints.xl)} {
    grid-gap: 30px;
    gap: 30px;
  }
`;
//#endregion

interface ProductsViewProps {
  products: Entities<Product>;
  headingLevel?: HeadingLevel;
}

const ProductsView = ({ products, headingLevel }: ProductsViewProps) => {
  const t = useTranslations('ProductsView');

  const categories = [t('allProductsCategory')];
  const sortingOptions = [
    t('sortByPopularityOption'),
    t('sortByPriceOption'),
    t('sortByAlphabetOption'),
  ];

  return (
    <>
      <ViewOptions>
        <CategoryList items={categories} />
        <Sorting options={sortingOptions} by={sortingOptions[0]} />
      </ViewOptions>
      <ProductList>
        {Object.entries(products).map(([id, product]) => (
          <li key={id}>
            <ProductCard
              productId={id}
              product={product}
              headingLevel={headingLevel}
            />
          </li>
        ))}
      </ProductList>
    </>
  );
};

export default ProductsView;
export { ViewOptions, ProductList };
