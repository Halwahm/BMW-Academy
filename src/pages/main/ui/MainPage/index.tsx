import { Box } from '@chakra-ui/react';
import { OrderManagement } from '../../../../widgets/orderManagement/ui/OrderManagement';

export const MainPage = () => {
  return (
    <Box minH="100vh" bg="white" width="100%">
      <OrderManagement />
    </Box>
  );
};
