import { useEffect, useRef } from 'react';
// @ts-ignore
import ScrollBooster from 'scrollbooster';
import styled from 'styled-components';
import { em, lerpByEM, up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const minFontSize = 14;
const maxFontSize = 18;
const lerpByFontSize = (from: number, to: number) =>
  lerpByEM(from, to, minFontSize, maxFontSize);

const CategoryButton = styled.button.attrs({ type: 'button' })`
  min-width: ${lerpByFontSize(14, 18)};
  padding: ${lerpByFontSize(4, 11)} ${lerpByFontSize(10, 18)};
  background: #282828;
  border: none;
  border-radius: ${lerpByFontSize(33, 99)} ${lerpByFontSize(20, 60)}
    ${lerpByFontSize(20, 60)} ${lerpByFontSize(10, 30)};
  color: white;
  font-size: 1em;
  letter-spacing: 0.015em;
  text-align: center;
  cursor: pointer;
`;

const List = styled.ul`
  display: flex;
  min-width: max-content;
  font-size: ${em(14)};
  list-style: none;

  & > li + li {
    margin-left: ${em(5)};
  }

  @media ${up(breakpoints.sm)} {
    font-size: ${em((maxFontSize + minFontSize) / 2)};
  }

  @media ${up(breakpoints.xl)} {
    font-size: ${em(maxFontSize)};
  }
`;

const Viewport = styled.div`
  width: 100%;
  overflow: hidden;
`;
//#endregion

interface CategoryListProps {
  items: string[];
  className?: string;
  onSelect?: (category: string) => void;
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
          <li key={v}>
            <CategoryButton>{v}</CategoryButton>
          </li>
        ))}
      </List>
    </Viewport>
  );
};

export default CategoryList;
export type { CategoryListProps };
