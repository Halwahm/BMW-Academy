import { useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { OrderForm } from '../../../../features/orderForm/ui/OrderForm';
import { OrderList } from '../../../../features/orderList/ui/OrderList';
import { colors } from '../../../../shared/config/theme';

export const OrderManagement = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleToggleCreation = () => {
    setIsCreating(!isCreating);
  };

  const handleHideCreation = () => {
    setIsCreating(false);
  };

  return (
    <Box width="100%">
      {isCreating ? (
        <Box>
          <Flex justify="space-between" width="100%" p={6} pb={0}>
            <Heading fontSize="20px" fontWeight="600" color={colors.primary.secondary}>
              Создание заказа
            </Heading>
          </Flex>
          <OrderForm onHideCreation={handleHideCreation} />
        </Box>
      ) : (
        <Box p={6}>
          <Flex justify="space-between" width="100%" mb={6}>
            <Heading fontSize="20px" fontWeight="600" color={colors.primary.secondary}>
              Заказы
            </Heading>

            <Box>
              <Button
                onClick={handleToggleCreation}
                padding="10px 16px"
                borderRadius="4px"
                display="flex"
                alignItems="center"
                gap="8px"
                fontSize="14px"
                fontWeight={500}
                bgColor={colors.secondary.button}
                color="white"
                _hover={{ bgColor: colors.secondary.buttonColor }}
                height="36px"
              >
                <FiPlus size="14px" />
                Добавить заказ
              </Button>
            </Box>
          </Flex>
          <OrderList />
        </Box>
      )}
    </Box>
  );
};
