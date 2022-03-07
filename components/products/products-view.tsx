import CategoryList from 'components/products/category-list';
import ProductCard from 'components/products/product-card';
import Sorting from 'components/products/sorting';
import { HeadingLevel } from 'lib/accessibility';
import { Product, SortBy } from 'lib/products';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { up, rem } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const minColumnWidth = 290;
const maxColumnWidth = 360;
const smGap = 20;
const mdGap = 24;
const lgGap = 28;
const xlGap = 32;

const ViewOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.625rem;

  & > * + * {
    margin: 1rem 0 0 0;
  }

  @media ${up(breakpoints.md)} {
    flex-direction: row;
    margin-bottom: 1.25rem;

    & > * + * {
      margin: 0 0 0 1rem;
    }
  }

  @media ${up(breakpoints.xxl)} {
    margin-bottom: 1.75rem;
  }
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 0.625rem;
  gap: 0.625rem;
  max-width: inherit;
  list-style: none;

  @media ${up(breakpoints.sm)} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: ${rem(smGap)};
    gap: ${rem(smGap)};
  }

  @media ${up(breakpoints.md)} {
    grid-gap: ${rem(mdGap)};
    gap: ${rem(mdGap)};
  }

  @media ${up(breakpoints.lg)} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: ${rem(lgGap)};
    gap: ${rem(lgGap)};
  }

  @media ${up(breakpoints.xl)} {
    grid-gap: ${rem(xlGap)};
    gap: ${rem(xlGap)};
  }

  @media ${up(breakpoints.xxl)} {
    grid-template-columns: repeat(auto-fill, minmax(${minColumnWidth}px, 1fr));
  }
`;

const Container = styled.div`
  max-width: ${maxColumnWidth}px;
  margin: 0 auto;

  @media ${up(breakpoints.sm)} {
    max-width: calc(${maxColumnWidth}px * 2 + ${rem(smGap)} * 1);
  }

  @media ${up(breakpoints.md)} {
    max-width: calc(${maxColumnWidth}px * 2 + ${rem(mdGap)} * 1);
  }

  @media ${up(breakpoints.lg)} {
    max-width: calc(${maxColumnWidth}px * 3 + ${rem(lgGap)} * 2);
  }

  @media ${up(breakpoints.xl)} {
    max-width: calc(${maxColumnWidth}px * 3 + ${rem(xlGap)} * 2);
  }

  @media ${up(breakpoints.xxl)} {
    max-width: initial;
    margin: initial;
  }
`;
//#endregion

interface ProductsViewProps {
  products: Product[];
  sortBy: SortBy;
  sortAscending?: boolean;
  headingLevel?: HeadingLevel;
  className?: string;
}

const ProductsView = ({
  products,
  sortBy,
  sortAscending,
  headingLevel,
  className,
}: ProductsViewProps) => {
  const router = useRouter();
  const t = useTranslations('ProductsView');

  const categories = [t('allProductsCategory')];
  const sortingOptions = [
    t('sortByPopularityOption'),
    t('sortByPriceOption'),
    t('sortByAlphabetOption'),
  ];

  const handleSortingChange = (by: string, asc?: boolean) => {
    const sortBy = sortingOptions.indexOf(by);
    router.replace(`?sort-by=${sortBy}${asc ? '&sort-asc' : ''}`);
  };

  return (
    <Container className={className}>
      <ViewOptions>
        <CategoryList items={categories} />
        <Sorting
          options={sortingOptions}
          by={sortingOptions[sortBy]}
          asc={sortAscending}
          onSortingChange={handleSortingChange}
        />
      </ViewOptions>
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} headingLevel={headingLevel} />
          </li>
        ))}
      </ProductList>
    </Container>
  );
};

export default ProductsView;
export { ViewOptions, ProductList };
