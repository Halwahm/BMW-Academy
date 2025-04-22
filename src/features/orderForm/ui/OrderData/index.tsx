import { useEffect } from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import { Controller, Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Client } from '../../../../entities/client/model/types';
import { OrderSchema } from '../../model/schema';
import { Field } from '../../../../shared/ui/Field';
import { Select } from '../../../../shared/ui/Select';
import { formatPhone } from '../../../../shared/lib/formatters/phone';
import { colors } from '../../../../shared/config/theme';

interface OrderDataProps {
  errors: FieldErrors<OrderSchema>;
  control: Control<OrderSchema>;
  clients: Client[];
  setValue: UseFormSetValue<OrderSchema>;
}

export const OrderData = ({ errors, control, clients, setValue }: OrderDataProps) => {
  const clientError = errors.client;
  const clientOptions = clients.map(client => client.name);


  useEffect(() => {
    if (clients.length > 0) {
      const firstClient = clients[0];
      setValue('client.name', firstClient.name);
      setValue('client.phone', formatPhone(firstClient.phone));
      setValue('client.address', firstClient.address);
    }
  }, [clients, setValue]);

  return (
    <Box>
      <Field
        label="Постоянный клиент"
        invalid={!!clientError?.name}
        errorText={clientError?.name?.message}
        id="client-name"
      >
        <Controller
          control={control}
          name="client.name"
          render={({ field: { value, onChange } }) => (
            <Select
              id="client-name"
              options={clientOptions}
              value={value || ''}
              onChange={(name) => {
                const newClient = clients.find(
                  (client) => client.name === name
                );

                onChange(name);

                if (newClient) {
                  const { phone, address } = newClient;
                  setValue('client.phone', formatPhone(phone));
                  setValue('client.address', address);
                }
              }}
              placeholder="Выберите клиента..."
            />
          )}
        />
      </Field>

      <Field
        label="Номер телефона"
        invalid={!!clientError?.phone}
        errorText={clientError?.phone?.message}
        id="client-phone"
      >
        <Controller
          control={control}
          name="client.phone"
          render={({ field: { value, onChange } }) => (
            <Box
              as={IMaskInput}
              id="client-phone"
              name="client-phone"
              mask="+7 (000) 000-00-00"
              unmask={false}
              value={value || ''}
              onAccept={(value: string) => onChange(value)}
              placeholder="+7 (___) ___-__-__"
              width="100%"
              p="2"
              borderWidth="1px"
              borderRadius="md"
              borderColor={colors.primary.inputBorder}
              _hover={{ borderColor: colors.primary.main }}
              _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
            />
          )}
        />
      </Field>

      <Field
        label="Комментарий"
        invalid={!!errors.comments}
        errorText={errors.comments?.message}
        id="comments"
      >
        <Controller
          control={control}
          name="comments"
          render={({ field }) => (
            <Textarea
              {...field}
              id="comments"
              name="comments"
              placeholder="Введите комментарий..."
              borderColor={colors.primary.inputBorder}
              _hover={{ borderColor: colors.primary.main }}
              _focus={{ borderColor: colors.primary.main, boxShadow: 'none' }}
              minHeight="100px"
              resize="none"
            />
          )}
        />
      </Field>
    </Box>
  );
};
