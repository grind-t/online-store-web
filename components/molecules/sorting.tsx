import StandaloneArrowIcon from 'components/atoms/icons/arrow-icon';
import { useSelect } from 'downshift';
import { useUID } from 'react-uid';
import styled from 'styled-components';
import { em } from 'styles/mixins';

//#region styled
const ArrowIcon = styled(StandaloneArrowIcon)<{ down?: boolean }>`
  ${(props) => props.down && 'transform: rotate(180deg);'}
`;

const OrderToggle = styled.button.attrs({ type: 'button' })`
  margin-right: 2px;
  background: none;
  border: none;
  line-height: 0;
  cursor: pointer;
`;

const OptionsLabel = styled.label`
  margin-right: 1px;
  color: #2c2c2c;
`;

const OptionsToggle = styled.button.attrs({ type: 'button' })`
  margin-bottom: -1px;
  background: none;
  border-color: #fe5f1e;
  border-style: dashed;
  border-width: 0 0 1px 0;
  color: #fe5f1e;
`;

const Options = styled.ul`
  position: absolute;
  top: 24px;
  right: 0px;
  width: 134px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
  list-style: none;
  z-index: 1;
`;

const Option = styled.li<{ highlighted?: boolean }>`
  padding: 10px 12px;
  ${(props) =>
    props.highlighted && 'background: rgba(254, 95, 30, 0.05); color: #FE5F1E;'}

  &:first-of-type {
    margin-top: 13px;
  }

  &:last-of-type {
    margin-bottom: 13px;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  height: fit-content;
  min-width: max-content;
  color: #2c2c2c;
  font-size: ${em(14)};
  letter-spacing: 0.015em;
`;
//#endregion

interface SortingProps {
  options: string[];
  by: string;
  asc?: boolean;
  className?: string;
}

const Sorting = ({ options, by, asc, className }: SortingProps) => {
  const uid = useUID();
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ id: uid, items: options, defaultSelectedItem: by });

  return (
    <Container className={className}>
      <OrderToggle>
        <ArrowIcon down={!asc} />
      </OrderToggle>
      <OptionsLabel {...getLabelProps()}>Сортировка по:</OptionsLabel>
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
