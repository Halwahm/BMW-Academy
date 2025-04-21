import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text
} from '@chakra-ui/react';
import { RootState, AppDispatch } from '../../../../app/providers/store';
import { fetchClients } from '../../../../entities/client/model/slice';
import { OrderItem } from '../OrderItem';
import { colors } from '../../../../shared/config/theme';

export const OrderList = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  // Даже если заказов нет, мы все равно показываем таблицу с заголовками

  return (
    <Box width="100%" bg="white">
      <Table variant="simple" size="sm" width="100%" style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }} colorScheme="gray">
        <Thead bg={colors.primary.tableHeader}>
          <Tr>
            <Th color={colors.primary.main} width="3%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">№</Th>
            <Th color={colors.primary.main} width="8%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">КЛИЕНТ</Th>
            <Th color={colors.primary.main} width="14%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">НОМЕР ТЕЛЕФОНА</Th>
            <Th color={colors.primary.main} width="8%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">СТАТУС</Th>
            <Th color={colors.primary.main} width="10%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">ДАТА ДОСТАВКИ</Th>
            <Th color={colors.primary.main} width="15%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">АДРЕС ДОСТАВКИ</Th>
            <Th color={colors.primary.main} width="5%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">КОЛ-ВО</Th>
            <Th color={colors.primary.main} width="9%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="normal" lineHeight="1.2">
              СТОИМОСТЬ ТОВАРОВ<br/>(RUB)
            </Th>
            <Th color={colors.primary.main} width="9%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="normal" lineHeight="1.2">
              СТОИМОСТЬ ДОСТАВКИ<br/>(RUB)
            </Th>
            <Th color={colors.primary.main} width="9%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="normal" lineHeight="1.2">
              СТОИМОСТЬ ИТОГО<br/>(RUB)
            </Th>
            <Th color={colors.primary.main} width="10%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">КОММЕНТАРИЙ</Th>
            <Th color={colors.primary.main} width="10%" fontSize="12px" fontWeight="500" textTransform="uppercase" py={3} whiteSpace="nowrap">ДЕЙСТВИЯ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderItem key={order.id} order={order} index={index} />
            ))
          ) : (
            <Tr>
              <Td colSpan={12} textAlign="center" py={4}>
                <Text color={colors.primary.main} fontSize="14px">Нет заказов</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};
