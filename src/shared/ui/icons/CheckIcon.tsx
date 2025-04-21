import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" boxSize="20px" {...props}>
      <path
        fill="currentColor"
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
      />
    </Icon>
  );
};
