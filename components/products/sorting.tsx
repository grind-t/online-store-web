import StandaloneArrowIcon from 'components/common/icons/arrow-icon';
import { useSelect } from 'downshift';
import { useTranslations } from 'next-intl';
import { useUID } from 'react-uid';
import styled from 'styled-components';

//#region styled
const ArrowIcon = styled(StandaloneArrowIcon)<{ down?: boolean }>`
  ${(props) => props.down && 'transform: rotate(180deg);'}
`;

const OrderToggle = styled.button.attrs({ type: 'button' })`
  margin-right: 0.25rem;
  background: none;
  border: none;
  line-height: 0;
`;

const OptionsLabel = styled.label`
  margin-right: 0.25rem;
  color: #2c2c2c;
  font-size: 0.875rem;
  letter-spacing: 0.015em;
`;

const OptionsToggle = styled.button.attrs({ type: 'button' })`
  margin-bottom: -1px;
  background: none;
  border-color: #fe5f1e;
  border-style: dashed;
  border-width: 0 0 1px 0;
  color: #fe5f1e;
  font-size: 0.875rem;
  letter-spacing: 0.015em;
`;

const Options = styled.ul`
  position: absolute;
  top: 1.5rem;
  right: 0;
  width: 8.375rem;
  background: white;
  border-radius: 0.625rem;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
  list-style: none;
  z-index: 1;
`;

const Option = styled.li<{ highlighted?: boolean }>`
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  letter-spacing: 0.015em;
  cursor: default;
  ${(props) =>
    props.highlighted && 'background: rgba(254, 95, 30, 0.05); color: #FE5F1E;'}

  &:first-of-type {
    margin-top: 0.875rem;
  }

  &:last-of-type {
    margin-bottom: 0.875rem;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  min-width: max-content;
  color: #2c2c2c;
`;
//#endregion

interface SortingProps {
  options: string[];
  by: string;
  asc?: boolean;
  className?: string;
  onSortingChange?: (by: string, asc?: boolean) => void;
}

const Sorting = ({
  options,
  by,
  asc,
  className,
  onSortingChange,
}: SortingProps) => {
  const t = useTranslations('Sorting');
  const uid = useUID();

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    id: uid,
    items: options,
    selectedItem: by,
    onSelectedItemChange: ({ selectedItem }) =>
      onSortingChange && onSortingChange(selectedItem as string, asc),
  });

  return (
    <Container className={className}>
      <OrderToggle onClick={() => onSortingChange && onSortingChange(by, !asc)}>
        <ArrowIcon down={!asc} />
      </OrderToggle>
      <OptionsLabel {...getLabelProps()}>{t('sortBy') + ':'}</OptionsLabel>
      <OptionsToggle {...getToggleButtonProps()}>{selectedItem}</OptionsToggle>
      <Options {...getMenuProps()}>
        {isOpen &&
          options.map((v, i) => (
            <Option
              key={v}
              highlighted={i === highlightedIndex}
              {...getItemProps({ item: v, index: i })}
            >
              {v}
            </Option>
          ))}
      </Options>
    </Container>
  );
};

export default Sorting;
