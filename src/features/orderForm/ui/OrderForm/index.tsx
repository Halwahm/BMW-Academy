import { useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootState } from '../../../../app/providers/store';
import { OrderData } from '../OrderData';
import { OrderDelivery } from '../OrderDelivery';
import { ProductTable } from '../ProductTable';
import { orderSchema, OrderSchema } from '../../model/schema';
import { colors } from '../../../../shared/config/theme';

interface OrderFormProps {
  onHideCreation: () => void;
}

export const OrderForm = ({ onHideCreation }: OrderFormProps) => {
  const clients = useSelector((state: RootState) => state.clients.clients);
  const [shippingPrice, setShippingPrice] = useState(0);

  const {
    control,
    getValues,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<OrderSchema>({
    mode: 'onChange',
    resolver: zodResolver(orderSchema),
    defaultValues: {
      client: {
        name: '',
        phone: '',
        address: '',
      },
      comments: '',
      products: [],
      deliveryDate: new Date(),
      shippingCost: 0,
    },
  });

  return (
    <Box bg="white" width="100%" height="100vh" position="relative" overflow="visible">
      <Flex height="100%">
        <Box width="30%" maxWidth="350px" p={6}>
          <Box mb={6}>
            <Heading as="h3" size="sm" mb={4} color={colors.primary.main}>
              Данные заказа
            </Heading>
            <OrderData
              errors={errors}
              control={control}
              clients={clients}
              setValue={setValue}
            />
          </Box>

          <Box mb={10}>
            <Heading as="h3" size="sm" mb={4} color={colors.primary.main}>
              Доставка
            </Heading>
            <OrderDelivery
              errors={errors}
              control={control}
              setShippingPrice={setShippingPrice}
            />
          </Box>
        </Box>

        <Box
          width="1px"
          bg={colors.secondary.divider}
          height="83%"
          mt="35px"
          mb="100px"
        />

        <Box flex="1" p={6}>
          <Heading as="h3" size="sm" mb={4} color={colors.primary.main}>
            Товары к заказу
          </Heading>
          <ProductTable
            control={control}
            shippingPrice={shippingPrice}
            getValues={getValues}
            isValid={isValid}
            onHideCreation={onHideCreation}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Flex>
    </Box>
  );
};
