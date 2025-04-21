import { ReactNode } from 'react';
import { Box, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { colors } from '../../config/theme';

interface FieldProps {
  label?: string;
  children: ReactNode;
  invalid?: boolean;
  errorText?: string;
}

export const Field = ({ label, children, invalid, errorText }: FieldProps) => {
  return (
    <FormControl isInvalid={invalid} mb={4}>
      {label && (
        <FormLabel fontSize="14px" color={colors.primary.main} mb={2}>
          {label}
        </FormLabel>
      )}
      <Box>{children}</Box>
      {invalid && errorText && (
        <FormErrorMessage fontSize="12px" mt={1}>
          {errorText}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
