import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';
import CategoryList from 'components/molecules/category-list';
import Sorting from 'components/molecules/sorting';
import ProductCard from 'components/molecules/product-card';

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
  grid-template-columns: repeat(auto-fit, minmax(240px, auto));
  grid-gap: 10px;
  gap: 10px;
  justify-content: center;
  list-style: none;

  @media ${up(breakpoints.sm)} {
    grid-gap: 20px;
    gap: 20px;
  }

  @media ${up(breakpoints.lg)} {
    //grid-template-columns: repeat(auto-fit, minmax(240px, auto));
    justify-content: start;
  }

  @media ${up(breakpoints.xl)} {
    grid-gap: 30px;
    gap: 30px;
  }
`;
//#endregion

const ProductsView = () => {
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
        <li>
          <ProductCard
            options={[['Электронный'], ['1 месяц', '3 месяца', '12 месяцев']]}
          />
        </li>
        <li>
          <ProductCard
            options={[['Электронный'], ['1 месяц', '3 месяца', '12 месяцев']]}
          />
        </li>
      </ProductList>
    </>
  );
};

export default ProductsView;
