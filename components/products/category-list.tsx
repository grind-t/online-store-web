import { Category } from 'lib/products';
import { useEffect, useRef } from 'react';
// @ts-ignore
import ScrollBooster from 'scrollbooster';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const CategoryButton = styled.button.attrs({ type: 'button' })`
  min-width: 3rem;
  padding: 0.25rem 0.625rem;
  background: #282828;
  border: none;
  border-radius: 2rem 1.25rem 1.25rem 0.625rem;
  color: white;
  font-size: 0.875rem;
  letter-spacing: 0.015em;
  text-align: center;

  @media ${up(breakpoints.xs)} {
    min-width: 4rem;
    padding: 0.375rem 0.875rem;
    border-radius: 3.25rem 2rem 2rem 1rem;
    font-size: 1rem;
  }

  @media ${up(breakpoints.md)} {
    min-width: 5.25rem;
    padding: 0.625rem 1.125rem;
    border-radius: 6.25rem 3.75rem 3.75rem 1.875rem;
    font-size: 1.125rem;
  }
`;

const List = styled.ul`
  display: flex;
  min-width: max-content;
  list-style: none;

  & > li + li {
    margin-left: 0.25rem;
  }

  @media ${up(breakpoints.xs)} {
    & > li + li {
      margin-left: 0.375rem;
    }
  }

  @media ${up(breakpoints.md)} {
    & > li + li {
      margin-left: 0.5rem;
    }
  }
`;

const Viewport = styled.div`
  width: 100%;
  overflow: hidden;
`;
//#endregion

interface CategoryListProps {
  items: Category[];
  className?: string;
  onSelect?: (category: Category) => void;
}

const CategoryList = ({ items, className, onSelect }: CategoryListProps) => {
  const viewport = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    if (!viewport || !content) return;
    const sb = new ScrollBooster({
      viewport: viewport.current,
      content: content.current,
      scrollMode: 'transform',
      direction: 'horizontal',
      inputsFocus: false,
      emulateScroll: true,
    });
    return () => sb.destroy();
  }, [viewport, content]);

  return (
    <Viewport ref={viewport} className={className}>
      <List ref={content}>
        {items.map((v) => (
          <li key={v.id}>
            <CategoryButton onClick={() => onSelect && onSelect(v)}>
              {v.name}
            </CategoryButton>
          </li>
        ))}
      </List>
    </Viewport>
  );
};

export default CategoryList;
export type { CategoryListProps };
