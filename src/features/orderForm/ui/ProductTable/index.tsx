import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Input,
  Button,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  NumberInput,
  NumberInputField,
  Textarea
} from '@chakra-ui/react';

import {
  useFieldArray,
  Control,
  UseFormGetValues,
  UseFormHandleSubmit
} from 'react-hook-form';
import { OrderSchema } from '../../model/schema';
import { addOrder } from '../../../../entities/order/model/slice';
import { OrderStatus } from '../../../../entities/order/model/types';
import { formatArticle } from '../../../../shared/lib/formatters/article';
import { colors } from '../../../../shared/config/theme';

interface ProductTableProps {
  control: Control<OrderSchema>;
  shippingPrice: number;
  getValues: UseFormGetValues<OrderSchema>;
  isValid: boolean;
  onHideCreation: () => void;
  handleSubmit: UseFormHandleSubmit<OrderSchema>;
}

export const ProductTable = ({
  control,
  shippingPrice,
  getValues,
  isValid,
  onHideCreation,
  handleSubmit,
}: ProductTableProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const { fields, append } = useFieldArray({
    control,
    name: 'products',
  });

  const calculateTotalCost = () => {
    const products = getValues('products') || [];
    return products.reduce((total, product) => {
      return total + (product.cost * product.count);
    }, 0);
  };

  const totalCost = calculateTotalCost();
  const totalCostWithShipping = totalCost + (shippingPrice || 0);

  // Временные значения для нового товара
  const [newProduct, setNewProduct] = useState({
    name: '',
    article: '',
    count: 1,
    cost: 0,
    comment: ''
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.article || newProduct.cost === 0) {
      return;
    }

    const formattedArticle = formatArticle(newProduct.article);

    append({
      ...newProduct,
      article: formattedArticle
    });

    // Сбрасываем форму и скрываем её
    setNewProduct({
      name: '',
      article: '',
      count: 1,
      cost: 0,
      comment: ''
    });
    setIsAdding(false);
  };

  const handleSave = (formValues: OrderSchema) => {
    if (!isValid) {
      return;
    }

    // Убедимся, что имя клиента не undefined
    const clientName = formValues.client.name || '';

    dispatch(
      addOrder({
        ...formValues,
        id: Date.now(),
        status: OrderStatus.Created,
        deliveryDate: new Date(formValues.deliveryDate).toISOString(),
        client: {
          ...formValues.client,
          name: clientName
        }
      })
    );

    onHideCreation();
  };

  return (
    <Box width="100%">
      <Flex direction="column" gap="20px">
        <Box width="100%" overflowX="auto">
          <Table variant="simple" mb={4} width="100%">
            <Thead bg={colors.primary.tableHeader}>
              <Tr>
                <Th color={colors.primary.main} width="50px" fontSize="14px" fontWeight="500" textTransform="uppercase" py={3}>№</Th>
                <Th color={colors.primary.main} width="25%" fontSize="14px" fontWeight="500" textTransform="uppercase" py={3}>НАЗВАНИЕ</Th>
                <Th color={colors.primary.main} width="20%" fontSize="14px" fontWeight="500" textTransform="uppercase" py={3}>АРТИКУЛ</Th>
                <Th color={colors.primary.main} width="10%" fontSize="14px" fontWeight="500" textTransform="uppercase" py={3}>КОЛИЧЕСТВО</Th>
                <Th color={colors.primary.main} width="15%" fontSize="14px" fontWeight="500" textTransform="uppercase" py={3}>ЦЕНА (RUB)</Th>
                <Th color={colors.primary.main} width="25%" fontSize="14px" fontWeight="500" textTransform="uppercase" py={3}>КОММЕНТАРИЙ</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fields.map((field, index) => (
                <Tr key={field.id} _hover={{ bg: '#F9FAFB' }}>
                  <Td textAlign="center" py={3}>{index + 1}</Td>
                  <Td py={3}>{field.name}</Td>
                  <Td py={3}>{formatArticle(field.article)}</Td>
                  <Td textAlign="center" py={3}>{isNaN(field.count) ? 1 : field.count}</Td>
                  <Td py={3}>{isNaN(field.cost) || field.cost === 0 ? 1 : field.cost}</Td>
                  <Td py={3}>{field.comment}</Td>
                </Tr>
              ))}

              {isAdding && (
                <Tr bg="#F9FAFB">
                  <Td textAlign="center" py={3}>{fields.length + 1}</Td>
                  <Td py={3}>
                    <Input
                      size="sm"
                      placeholder="Название"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      borderColor={colors.primary.inputBorder}
                      _hover={{ borderColor: colors.primary.main }}
                      _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
                    />
                  </Td>
                  <Td py={3}>
                    <Input
                      size="sm"
                      placeholder="Артикул"
                      value={newProduct.article}
                      onChange={(e) => setNewProduct({ ...newProduct, article: e.target.value })}
                      borderColor={colors.primary.inputBorder}
                      _hover={{ borderColor: colors.primary.main }}
                      _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
                    />
                  </Td>
                  <Td py={3}>
                    <NumberInput
                      size="sm"
                      min={1}
                      value={newProduct.count}
                      onChange={(valueString) => {
                        const value = valueString === '' ? 1 : parseInt(valueString);
                        setNewProduct({ ...newProduct, count: isNaN(value) ? 1 : value });
                      }}
                    >
                      <NumberInputField
                        textAlign="center"
                        borderColor={colors.primary.inputBorder}
                        _hover={{ borderColor: colors.primary.main }}
                        _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
                      />
                    </NumberInput>
                  </Td>
                  <Td py={3}>
                    <NumberInput
                      size="sm"
                      min={1}
                      value={newProduct.cost === 0 ? '' : newProduct.cost}
                      onChange={(valueString) => {
                        if (valueString === '') {
                          setNewProduct({ ...newProduct, cost: 0 });
                          return;
                        }
                        const value = parseInt(valueString);
                        setNewProduct({ ...newProduct, cost: isNaN(value) ? 0 : value });
                      }}
                    >
                      <NumberInputField
                        borderColor={colors.primary.inputBorder}
                        _hover={{ borderColor: colors.primary.main }}
                        _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
                      />
                    </NumberInput>
                  </Td>
                  <Td py={3}>
                    <Textarea
                      size="sm"
                      placeholder="Комментарий"
                      rows={1}
                      resize="none"
                      value={newProduct.comment}
                      onChange={(e) => setNewProduct({ ...newProduct, comment: e.target.value })}
                      borderColor={colors.primary.inputBorder}
                      _hover={{ borderColor: colors.primary.main }}
                      _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
                    />
                  </Td>
                </Tr>
              )}
              {!isAdding && (
                <Tr cursor="pointer" onClick={() => setIsAdding(true)}>
                  <Td colSpan={6} py={3} textAlign="center">
                    <Text color="#9598B1" fontSize="14px">Заполните данные по товару</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>

          <Flex justify="flex-start" mb={4}>
            {isAdding && (
              <Flex gap={2}>
                <Button
                  size="sm"
                  bg={colors.secondary.button}
                  color="white"
                  _hover={{ bg: colors.secondary.buttonColor }}
                  onClick={handleAddProduct}
                  height="36px"
                  borderRadius="4px"
                  isDisabled={!newProduct.name || !newProduct.article || newProduct.cost === 0}
                >
                  Добавить
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                  borderColor="#505CC8"
                  color="#505CC8"
                  _hover={{ bg: 'gray.50' }}
                  height="36px"
                  borderRadius="4px"
                >
                  Отмена
                </Button>
              </Flex>
            )}
          </Flex>
        </Box>

        <Box>
          <Flex direction="column" gap="10px" mb={6} alignItems="flex-start">
            <Flex width="300px" justifyContent="space-between">
              <Text color="#484A6A" fontSize="14px" fontWeight="500">СУММА</Text>
              <Text fontWeight="500" fontSize="14px">{totalCost} RUB</Text>
            </Flex>
            <Flex width="300px" justifyContent="space-between">
              <Text color="#484A6A" fontSize="14px" fontWeight="500">СУММА С ДОСТАВКОЙ</Text>
              <Text fontWeight="500" fontSize="14px">{totalCostWithShipping} RUB</Text>
            </Flex>
          </Flex>

          <Flex gap="10px" justify="flex-end">
            <Button
              variant="ghost"
              onClick={onHideCreation}
              color="#505CC8"
              border="none"
              height="40px"
              width="120px"
              borderRadius="4px"
              fontSize="16px"
              fontWeight="500"
              _hover={{ bg: 'gray.50' }}
            >
              Отменить
            </Button>
            <Button
              onClick={handleSubmit(handleSave)}
              isDisabled={!isValid || fields.length === 0}
              bg={colors.secondary.button}
              color="white"
              _hover={{ bg: colors.secondary.buttonColor }}
              height="40px"
              width="120px"
              borderRadius="4px"
              fontSize="16px"
              fontWeight="500"
            >
              Создать
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
