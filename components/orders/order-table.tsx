import { useAllOrderItems } from 'lib/hooks/orders';
import { usePayment } from 'lib/hooks/payment';
import { OrderItem } from 'lib/orders';
import { createPayment } from 'lib/payment';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const Button = styled.button`
  padding: 0.25rem 0.5rem;
  background: #fe5f1e;
  border: none;
  border-radius: 1.25rem;
  color: white;
  line-height: 1;
  cursor: pointer;
`;

const THead = styled.thead`
  font-size: 1.25rem;
  color: #fe5f1e;

  th {
    font-weight: normal;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.5rem;
  }

  @media ${up(breakpoints.lg)} {
    font-size: 1.75rem;
  }
`;

const TBody = styled.tbody`
  vertical-align: top;

  @media ${up(breakpoints.md)} {
    font-size: 1.25rem;
  }
`;

const Table = styled.table`
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 3rem 0.5rem;
  margin: -0.5rem -3rem;
  text-align: center;

  th:nth-child(1) {
    min-width: 10rem;
    width: 10rem;

    @media ${up(breakpoints.md)} {
      width: 12rem;
    }
  }

  th:nth-child(2) {
    min-width: 3.5rem;
  }

  th:nth-child(3) {
    min-width: 8rem;
  }

  th:nth-child(4) {
    min-width: 8rem;
  }

  @media ${up(breakpoints.lg)} {
    border-spacing: 6rem 0.5rem;
    margin: -0.5rem -6rem;
  }
`;
//#endregion

const OrderTableRow = ({ item }: { item: OrderItem }) => {
  const t = useTranslations('OrderTableRow');
  const { order, variant } = item;
  const payment = usePayment(order.paymentId);
  const options = Object.values(variant.characteristics).join(', ');
  const name = `${variant.product.name} (${options})`;
  const loading = order.paymentId && !payment;

  const handlePayment = () => {
    createPayment(order.id)
      .then((payment) => {
        location.replace(payment.confirmation.confirmation_url);
      })
      .catch(console.error);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{`№${order.id}`}</td>
      <td>{loading ? '' : payment?.paid ? t('paid') : t('notPaid')}</td>
      <td>
        {!loading && (
          <Button onClick={handlePayment}>
            {payment?.paid ? t('go') : t('pay')}
          </Button>
        )}
      </td>
    </tr>
  );
};

const OrderTable = () => {
  const items = useAllOrderItems();
  const t = useTranslations('OrderTable');

  return (
    <Table>
      <THead>
        <tr>
          <th>{t('nameHeader')}</th>
          <th>{t('orderNumHeader')}</th>
          <th>{t('statusHeader')}</th>
          <th>{t('productHeader')}</th>
        </tr>
      </THead>
      <TBody>
        {items?.map((item) => (
          <OrderTableRow
            key={`${item.order.id},${item.variant.id}`}
            item={item}
          />
        ))}
      </TBody>
    </Table>
  );
};

export default OrderTable;
