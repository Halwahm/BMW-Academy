import { useState, useRef, useEffect } from 'react';
import { Box, Input, List, ListItem } from '@chakra-ui/react';
import { colors } from '../../config/theme';

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export const Select = ({ options, value, onChange, placeholder = 'Выберите...', id }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box position="relative" ref={wrapperRef}>
      <Box position="relative">
        <Input
          id={id}
          name={id}
          value={value || searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
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

      {isOpen && (
        <List
          position="absolute"
          width="100%"
          maxHeight="200px"
          overflowY="auto"
          bg="white"
          borderWidth="1px"
          borderColor={colors.primary.inputBorder}
          borderRadius="md"
          mt="2px"
          zIndex={10}
          boxShadow="sm"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <ListItem
                key={option}
                px={3}
                py={2}
                cursor="pointer"
                _hover={{ bg: colors.primary.tableHeader }}
                onClick={() => handleSelect(option)}
              >
                {option}
              </ListItem>
            ))
          ) : (
            <ListItem px={3} py={2} color={colors.primary.placeholder}>
              Нет совпадений
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
};
