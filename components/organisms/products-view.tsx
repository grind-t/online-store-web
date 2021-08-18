import styled from 'styled-components';
import CategoryList from 'components/molecules/category-list';
import Sorting from 'components/molecules/sorting';
import ProductCard from 'components/molecules/product-card';
import { breakpoints } from 'styles/varibles';
import { up } from 'styles/mixins';
import { Product } from 'lib/product';

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
  initialProducts?: Product[];
}

const ProductsView = ({ initialProducts }: ProductsViewProps) => {
  return (
    <>
      <ViewOptions>
        <CategoryList items={['Все', 'Playstation Plus']} />
        <Sorting
          options={['популярности', 'цене', 'алфавиту']}
          by="популярности"
        />
      </ViewOptions>
      <ProductList>
        {initialProducts &&
          initialProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
      </ProductList>
    </>
  );
};

export default ProductsView;
export { ViewOptions, ProductList };
