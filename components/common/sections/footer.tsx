import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 10px 80px 10px 5px;
  border-top: 1px solid#F6F6F6;

  @media ${up(breakpoints.md)} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 15px;
  }

  @media ${up(breakpoints.xxl)} {
    padding: 25px 30px 20px;
  }
`;

const OfferLink = styled.a`
  font-size: 1.125em;
  color: #fe5f1e;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.md)} {
    font-size: 1.25em;
    font-weight: bold;
  }

  @media ${up(breakpoints.xxl)} {
    font-size: 1.375em;
  }
`;

const Taxpayer = styled.p`
  color: #2c2c2c;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.md)} {
    font-size: 1.125em;
    font-weight: bold;
    text-align: center;
  }

  @media ${up(breakpoints.xxl)} {
    font-size: 1.25em;
  }
`;
//#endregion

const StoreFooter = () => {
  const t = useTranslations('StoreFooter');

  return (
    <Footer>
      <OfferLink href="/docs/offer.docx" download>
        {t('offer')}
      </OfferLink>
      <Taxpayer>
        Самозанятый Юрьев Василий Ильич <br />
        ИНН: 501603523165
      </Taxpayer>
    </Footer>
  );
};

export default StoreFooter;
