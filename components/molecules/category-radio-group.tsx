import { useUID } from 'react-uid';
import { ChangeEvent, useEffect, useRef } from 'react';
import CustomInput from 'components/atoms/custom-input';
import ScrollBooster from 'scrollbooster';
import styled from 'styled-components';

//#region styled
const CategoryRadio = styled(CustomInput).attrs({ type: 'radio' })`
  min-width: 5.929rem;
  padding: 0.786rem 1.071rem 0.786rem 1.429rem;
  margin: 0 0.5rem;
  background: #282828;
  border-radius: 7.143rem 4.286rem 4.286rem 2.143rem;
  color: white;
  font-size: 1.286rem;
  letter-spacing: 0.015em;
  text-align: center;
`;

const Content = styled.div`
  width: fit-content;
  white-space: nowrap;
`;

const Viewport = styled.div`
  overflow: hidden;
`;
//#endregion

interface CategoryRadioGroupProps {
  value?: string;
  options?: string[];
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CategoryRadioGroup = ({
  value,
  options,
  name,
  onChange,
}: CategoryRadioGroupProps) => {
  name = name || useUID();
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
    <Viewport ref={viewport}>
      <Content ref={content}>
        {options &&
          options.map((v) => (
            <CategoryRadio
              key={v}
              value={v}
              name={name}
              checked={v === value}
              onChange={onChange}
            >
              {v}
            </CategoryRadio>
          ))}
      </Content>
    </Viewport>
  );
};

export default CategoryRadioGroup;
