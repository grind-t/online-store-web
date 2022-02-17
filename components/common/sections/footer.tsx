import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const OfferLink = styled.a`
  font-size: 1.125rem;
  color: #fe5f1e;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.md)} {
    font-size: 1.25rem;
    font-weight: bold;
  }

  @media ${up(breakpoints.xxl)} {
    font-size: 1.375rem;
  }
`;

const Taxpayer = styled.p`
  color: #2c2c2c;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.md)} {
    font-size: 1.125rem;
    font-weight: bold;
    text-align: center;
  }

  @media ${up(breakpoints.xxl)} {
    font-size: 1.25rem;
  }
`;

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 0.625rem 5rem 0.625rem 0.25rem;
  border-top: 1px solid#F6F6F6;

  @media ${up(breakpoints.md)} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.25rem 1rem;
  }

  @media ${up(breakpoints.xxl)} {
    padding: 1.5rem 2rem 1.25rem;
  }
`;
//#endregion

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <Container>
      <OfferLink href="/docs/offer.docx" download>
        {t('offer')}
      </OfferLink>
      <Taxpayer>
        Самозанятый Юрьев Василий Ильич <br />
        ИНН: 501603523165
      </Taxpayer>
    </Container>
  );
};

export default Footer;
