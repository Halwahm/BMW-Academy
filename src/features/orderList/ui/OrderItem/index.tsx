import { useDispatch } from 'react-redux';
import {
  Tr,
  Td,
  IconButton,
  Badge,
  Flex,
  Tooltip
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '../../../../shared/ui/icons';
import { updateOrderStatus } from '../../../../entities/order/model/slice';
import { Order, OrderStatus } from '../../../../entities/order/model/types';
import { formatDate } from '../../../../shared/lib/date';
import { colors } from '../../../../shared/config/theme';

interface OrderItemProps {
  order: Order;
  index: number;
}

export const OrderItem = ({ order, index }: OrderItemProps) => {
  const dispatch = useDispatch();

  const {
    id,
    client: { name, phone, address },
    deliveryDate,
    shippingCost = 0,
    status,
    products,
    comments,
  } = order;

  const handleStatusChange = (newStatus: OrderStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  // Рассчитываем общую стоимость товаров
  const productsCost = products.reduce((total, product) => {
    return total + (product.cost * product.count);
  }, 0);

  // Общая стоимость заказа
  const totalCost = productsCost + shippingCost;

  // Определяем цвета для статуса
  const getStatusColors = () => {
    switch (status) {
      case OrderStatus.Created:
        return {
          color: colors.status.createdColor,
          bgColor: colors.status.createdBgColor,
          borderColor: colors.status.createdBorderColor,
        };
      case OrderStatus.Completed:
        return {
          color: colors.status.completedColor,
          bgColor: colors.status.completedBgColor,
          borderColor: colors.status.completedBorderColor,
        };
      case OrderStatus.Rejected:
        return {
          color: colors.status.rejectedColor,
          bgColor: colors.status.rejectedBgColor,
          borderColor: colors.status.rejectedBorderColor,
        };
      default:
        return {
          color: colors.status.createdColor,
          bgColor: colors.status.createdBgColor,
          borderColor: colors.status.createdBorderColor,
        };
    }
  };

  const statusColors = getStatusColors();

  // Подсчитываем общее количество товаров
  const totalQuantity = products.reduce((total, product) => {
    return total + product.count;
  }, 0);

  return (
    <Tr _hover={{ bg: '#F9FAFB' }}>
      <Td textAlign="center" py={3}>{index + 1}</Td>
      <Td py={3} textOverflow="ellipsis" overflow="hidden">{name || 'Не указано'}</Td>
      <Td py={3} textOverflow="ellipsis" overflow="hidden">{phone}</Td>
      <Td py={3}>
        <Badge
          px={3}
          py={1}
          borderRadius="4px"
          color={statusColors.color}
          bg={statusColors.bgColor}
          fontWeight="normal"
          border="1px solid"
          borderColor={statusColors.borderColor}
        >
          {status}
        </Badge>
      </Td>
      <Td py={3} textOverflow="ellipsis" overflow="hidden">{formatDate(deliveryDate)}</Td>
      <Td py={3} textOverflow="ellipsis" overflow="hidden">{address}</Td>
      <Td textAlign="center" py={3}>{totalQuantity}</Td>
      <Td py={3} textOverflow="ellipsis" overflow="hidden">{productsCost}</Td>
      <Td py={3} textOverflow="ellipsis" overflow="hidden">{shippingCost}</Td>
      <Td py={3} textOverflow="ellipsis" overflow="hidden">{totalCost}</Td>
      <Td py={3} textOverflow="ellipsis" overflow="hidden">{comments || '-'}</Td>
      <Td py={3}>
        {status === OrderStatus.Created && (
          <Flex gap={2} justifyContent="flex-start">
            <Tooltip label="Отменить заказ" placement="top">
              <IconButton
                aria-label="Отменить заказ"
                icon={<CloseIcon />}
                variant="ghost"
                border="none"
                size="sm"
                onClick={() => handleStatusChange(OrderStatus.Rejected)}
                color="#D92550"
                _hover={{ bg: '#F7D4DE', boxShadow: 'none', border: 'none' }}
                _focus={{ boxShadow: 'none', border: 'none' }}
                _active={{ boxShadow: 'none' }}
                borderRadius="4px"
              />
            </Tooltip>
            <Tooltip label="Завершить заказ" placement="top">
              <IconButton
                aria-label="Завершить заказ"
                icon={<CheckIcon />}
                variant="ghost"
                border="none"
                size="sm"
                onClick={() => handleStatusChange(OrderStatus.Completed)}
                color="#38A169"
                _hover={{ bg: '#C6F6D5', boxShadow: 'none', border: 'none' }}
                _focus={{ boxShadow: 'none', border: 'none' }}
                _active={{ boxShadow: 'none' }}
                borderRadius="4px"
              />
            </Tooltip>
          </Flex>
        )}
      </Td>
    </Tr>
  );
};
