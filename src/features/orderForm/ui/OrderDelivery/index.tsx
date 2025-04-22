import { useState, useRef } from 'react';
import {
  Input,
  Flex,
  Box,
  List,
  ListItem,
  Tooltip,
  IconButton
} from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { OrderSchema } from '../../model/schema';
import { Field } from '../../../../shared/ui/Field';
import { DateSelector } from '../../../../shared/ui/DateSelector';
import { fetchAddressSuggestions } from '../../../../shared/api/dadata';
import { colors } from '../../../../shared/config/theme';

interface OrderDeliveryProps {
  errors: FieldErrors<OrderSchema>;
  control: Control<OrderSchema>;
  setShippingPrice: (price: number) => void;
}

export const OrderDelivery = ({ errors, control, setShippingPrice }: OrderDeliveryProps) => {
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const clientError = errors.client;

  const handleAddressChange = async (value: string, onChange: (value: string) => void) => {
    onChange(value);

    if (value.length > 3) {
      try {
        const suggestions = await fetchAddressSuggestions(value);
        setAddressSuggestions(suggestions.map(s => s.value));
        setShowSuggestions(suggestions.length > 0);
      } catch (error) {
        console.error(error);
      }
    } else {
      setAddressSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string, onChange: (value: string) => void) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Box>
      <Field
        label="Адрес"
        invalid={!!clientError?.address}
        errorText={clientError?.address?.message}
        id="client-address"
      >
        <Controller
          control={control}
          name="client.address"
          render={({ field: { value, onChange } }) => (
            <Box position="relative">
              <Flex>
                <Box position="relative" flex="1">
                  <Input
                    ref={addressInputRef}
                    id="client-address"
                    name="client-address"
                    value={value || ''}
                    onChange={(e) => handleAddressChange(e.target.value, onChange)}
                    placeholder="Введите адрес"
                    borderColor={colors.primary.inputBorder}
                    _hover={{ borderColor: colors.primary.main }}
                    _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
                    pr="30px"
                    appearance="none"
                    cursor="pointer"
                  />
                  <Box
                    position="absolute"
                    right="10px"
                    top="50%"
                    transform="translateY(-50%)"
                    pointerEvents="none"
                  >
                    <Box
                      as="svg"
                      width="10px"
                      height="6px"
                      viewBox="0 0 10 6"
                      fill="none"
                    >
                      <path d="M1 1L5 5L9 1" stroke={colors.primary.main} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </Box>
                  </Box>
                </Box>
                <Box
                  position="relative"
                  ml={2}
                  width="48px"
                  height="40px"
                >
                  <Tooltip label="Скопировать адрес" placement="top">
                    <IconButton
                      aria-label="Скопировать адрес"
                      icon={<FiCopy />}
                      onClick={() => handleCopyAddress(value || '')}
                      variant="ghost"
                      border="1px solid"
                      borderColor={colors.primary.inputBorder}
                      size="sm"
                      color={colors.secondary.buttonColor}
                      _hover={{ bg: colors.secondary.button, color: 'white', border: 'none' }}
                      _focus={{ boxShadow: 'none' }}
                      _active={{ boxShadow: 'none' }}
                      borderRadius="4px"
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                    />
                  </Tooltip>
                </Box>
              </Flex>

              {showSuggestions && addressSuggestions.length > 0 && (
                <Box
                  position="absolute"
                  width="100%"
                  zIndex={9999}
                  mt="2px"
                  bg="white"
                  boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                  borderRadius="md"
                  border="1px solid"
                  borderColor={colors.primary.inputBorder}
                >
                  <List
                    width="100%"
                    maxHeight="200px"
                    overflowY="auto"
                    bg="white"
                    borderRadius="md"
                    backgroundColor="white"
                  >
                    {addressSuggestions.map((suggestion, index) => (
                      <ListItem
                        key={index}
                        px={3}
                        py={2}
                        cursor="pointer"
                        bg="white"
                        position="relative"
                        zIndex={10000}
                        _hover={{ bg: colors.primary.tableHeader }}
                        onClick={() => handleSelectSuggestion(suggestion, onChange)}
                      >
                        {suggestion}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}
        />
      </Field>

      <Field
        label="Стоимость доставки"
        invalid={!!errors.shippingCost}
        errorText={errors.shippingCost?.message}
        id="shipping-cost"
      >
        <Controller
          control={control}
          name="shippingCost"
          render={({ field: { value, onChange } }) => (
            <Box position="relative" width="100%">
              <Flex width="100%">
                <Input
                  id="shipping-cost"
                  name="shipping-cost"
                  value={value === 0 ? '' : value}
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    if (inputValue === '') {
                      onChange(0);
                      setShippingPrice(0);
                      return;
                    }
                    if (!isNaN(parseFloat(inputValue))) {
                      const numValue = parseFloat(inputValue);
                      onChange(numValue);
                      setShippingPrice(numValue);
                    }
                  }}

                  placeholder="Введите сумму"
                  borderColor={colors.primary.inputBorder}
                  _hover={{ borderColor: colors.primary.main }}
                  _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
                  flex="1"
                  type="number"
                  min={0}
                  borderTopRightRadius={0}
                  borderBottomRightRadius={0}
                  mr="1px"
                />
                <Box
                  p={2}
                  bg={colors.secondary.rubBgColor}
                  borderTopRightRadius="md"
                  borderBottomRightRadius="md"
                  fontWeight="500"
                  width="60px"
                  height="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={colors.primary.main}
                  border="1px solid"
                  borderColor={colors.primary.inputBorder}
                  borderTopLeftRadius={0}
                  borderBottomLeftRadius={0}
                >
                  RUB
                </Box>
              </Flex>

            </Box>
          )}
        />
      </Field>

      <Field
        label="Дата"
        invalid={!!errors.deliveryDate}
        errorText={errors.deliveryDate?.message}
        id="delivery-date"
      >
        <Controller
          control={control}
          name="deliveryDate"
          render={({ field: { value, onChange } }) => (
            <DateSelector value={value} onChange={onChange} id="delivery-date" />
          )}
        />
      </Field>
    </Box>
  );
};
