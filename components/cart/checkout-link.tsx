import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styled from 'styled-components';

//#region styled
const Anchor = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  min-height: 3.5rem;
  background: #fe5f1e;
  border-radius: 2rem;
  color: white;
  font-size: 1rem;
  text-align: center;
`;
//#endregion

interface CheckoutLinkProps {
  className?: string;
}

const CheckoutLink = ({ className }: CheckoutLinkProps) => {
  const t = useTranslations('OrderLink');

  return (
    <Link href="/checkout" passHref>
      <Anchor className={className}>{t('text')}</Anchor>
    </Link>
  );
};

export default CheckoutLink;
