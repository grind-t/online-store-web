import { HeadingLevel } from 'lib/accessibility';
import Image from 'next/image';
import { useRouter } from 'next/router';
import icon from 'public/images/empty-cart.svg';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const ImageContainer = styled.div`
  grid-area: icon;
  align-self: flex-end;
  position: relative;
  width: 10rem;
  height: 8.5rem;

  @media ${up(breakpoints.sm)} {
    width: 15rem;
    height: 12.75rem;
  }

  @media ${up(breakpoints.lg)} {
    width: 18.75rem;
    height: 15.9375rem;
    margin-top: 2rem;
  }
`;

const Heading = styled.h1`
  grid-area: heading;
  align-self: flex-start;
  margin-top: 1.75rem;
  font-size: 1.125rem;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.xs)} {
    font-size: 1.25rem;
  }

  @media ${up(breakpoints.sm)} {
    font-size: 1.5rem;
  }

  @media ${up(breakpoints.lg)} {
    margin-top: 0;
    font-size: 2rem;
  }
`;

const Pargraph = styled.p`
  display: none;

  @media ${up(breakpoints.lg)} {
    display: block;
    max-width: 44.5rem;
    margin-top: 1rem;
    font-size: 1.375rem;
    font-weight: bold;
    color: #777777;
    text-align: center;
  }
`;

const GoBackButton = styled.button.attrs({ type: 'button' })`
  grid-area: back;
  align-self: flex-start;
  width: 9.875rem;
  min-height: 2.625rem;
  margin-top: 3.75rem;
  background: #282828;
  border: none;
  border-radius: 1.375rem;
  color: white;
  letter-spacing: 0.015em;
  cursor: pointer;

  @media ${up(breakpoints.sm)} {
    width: 13.125rem;
    min-height: 3rem;
    margin-top: 4.25rem;
  }
`;

const Container = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: 1.5fr auto auto auto 1fr;
  grid-template-areas: '.' 'icon' 'heading' 'back' '.';
  justify-items: center;

  @media ${up(breakpoints.lg)} {
    grid-template-rows: auto auto auto auto 1fr;
    grid-template-areas: 'heading' 'paragraph' 'icon' 'back';
  }
`;
//#endregion

interface EmptyCartViewProps {
  container?: 'main' | 'section';
  headingLevel?: HeadingLevel;
  className?: string;
}

const EmptyCartView = ({
  container,
  headingLevel,
  className,
}: EmptyCartViewProps) => {
  const router = useRouter();
  return (
    <Container as={container} className={className}>
      <Heading as={headingLevel}>Корзина пустая</Heading>
      <Pargraph>
        Пока вы ещё ничего не добавили в свою корзину, надеемся, что в скором
        времени это изменится.
      </Pargraph>
      <ImageContainer>
        <Image src={icon} alt="" layout="fill" />
      </ImageContainer>
      <GoBackButton onClick={() => router.back()}>Вернуться назад</GoBackButton>
    </Container>
  );
};

export default EmptyCartView;
