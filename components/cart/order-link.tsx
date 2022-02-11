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

interface OrderLinkProps {
  className?: string;
}

const OrderLink = ({ className }: OrderLinkProps) => {
  const t = useTranslations('OrderLink');

  return (
    <Link href="#" passHref>
      <Anchor className={className}>{t('text')}</Anchor>
    </Link>
  );
};

export default OrderLink;
