import CrossIcon from 'components/atoms/icons/cross-icon';
import VisuallyHidden from 'components/atoms/utils/visually-hidden';
import { HeadingLevel } from 'lib/utils';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const CloseIcon = styled(CrossIcon)`
  width: 100%;
  fill: white;
`;

const CloseButton = styled.button.attrs({ type: 'button' })`
  display: block;
  width: 1em;
  position: absolute;
  top: 0;
  right: calc(-1em - 5px);
  background: none;
  border: none;

  @media ${up(breakpoints.sm)} {
    right: calc(-1em - 10px);
  }
`;

const Heading = styled.h3`
  font-size: 1em;
  font-weight: normal;
  text-align: center;
`;

const Paragraph = styled.p`
  margin-top: 10px;
  font-size: 1em;
  white-space: pre-line;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  min-height: 250px;
  height: 45vw;
  max-height: 80vh;
  margin: 0 25px;
  padding: 20px;
  background: white;
  border-radius: 30px;

  @media ${up(breakpoints.sm)} {
    width: 75vw;
    max-width: initial;
    font-size: 1.125em;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.25em;
  }

  @media ${up(breakpoints.xl)} {
    font-size: 1.375em;
  }
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: visibility 500ms, opacity 500ms;
  z-index: 10;
`;
//#endregion

interface ProductInfoProps {
  name: string;
  description: string;
  isVisible: boolean;
  headingLevel?: HeadingLevel;
  onClose?: () => void;
}

const ProductInfo = ({
  name,
  description,
  isVisible,
  headingLevel,
  onClose,
}: ProductInfoProps) => {
  const t = useTranslations('ProductInfo');

  return (
    <Overlay isVisible={isVisible}>
      <Container>
        <Content>
          <Heading as={headingLevel}>{name}</Heading>
          <Paragraph>{description}</Paragraph>
        </Content>
        <CloseButton onClick={onClose}>
          <VisuallyHidden>{t('close')}</VisuallyHidden>
          <CloseIcon />
        </CloseButton>
      </Container>
    </Overlay>
  );
};

export default ProductInfo;
