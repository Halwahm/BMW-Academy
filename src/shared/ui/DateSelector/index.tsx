import { useState } from 'react';
import { Box, Button, Flex, Input, Icon } from '@chakra-ui/react';
import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { isToday, isTomorrow, isDayAfterTomorrow, formatDate } from '../../lib/date';
import { colors } from '../../config/theme';

interface DateSelectorProps {
  value: Date;
  onChange: (value: Date) => void;
}

export const DateSelector = ({ value, onChange }: DateSelectorProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const today = new Date();
  const formattedSelectedDay = formatDate(value);

  const handleButtonClick = (daysOffset: number) => {
    const newDate = dayjs().add(daysOffset, 'day').toDate();
    onChange(newDate);
  };

  const handleDatePickerChange = (date: Date | null) => {
    if (date) {
      onChange(date);
    }
    setIsCalendarOpen(false);
  };

  return (
    <Box position="relative" width="100%" zIndex="1000">
      <Flex gap="10px" direction="column">
        <Flex gap="10px">
          <Box position="relative" flex="1">
            <Flex alignItems="center" borderWidth="1px" borderColor="#E2E8F0" borderRadius="md" pl={3}>
              <Icon as={FiCalendar} color="#505CC8" mr={2} boxSize="20px" />
              <Input
                value={formattedSelectedDay}
                readOnly
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                cursor="pointer"
                border="none"
                _hover={{ borderColor: 'transparent' }}
                _focus={{ borderColor: 'transparent', boxShadow: 'none' }}
                pr="30px"
                appearance="none"
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
                  <path d="M1 1L5 5L9 1" stroke="#595B83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>

        <Flex gap="4px" mt={2}>
          <Button
            onClick={() => handleButtonClick(0)}
            variant="outline"
            size="sm"
            minWidth="80px"
            width="auto"

            borderRadius="6px"
            bg={isToday(value) ? colors.secondary.button : 'white'}
            color={isToday(value) ? 'white' : "#505CC8"}
            borderColor="#505CC8"
            _hover={{ bg: isToday(value) ? colors.secondary.buttonColor : 'gray.50' }}
            fontSize="13px"
            fontWeight="500"
            px="10px"
            py="6.5px"
          >
            Сегодня
          </Button>
          <Button
            onClick={() => handleButtonClick(1)}
            variant="outline"
            size="sm"
            minWidth="80px"
            width="auto"

            borderRadius="6px"
            bg={isTomorrow(value) ? colors.secondary.button : 'white'}
            color={isTomorrow(value) ? 'white' : "#505CC8"}
            borderColor="#505CC8"
            _hover={{ bg: isTomorrow(value) ? colors.secondary.buttonColor : 'gray.50' }}
            fontSize="13px"
            fontWeight="500"
            px="10px"
            py="6.5px"
          >
            Завтра
          </Button>
          <Button
            onClick={() => handleButtonClick(2)}
            variant="outline"
            size="sm"
            minWidth="80px"
            width="auto"

            borderRadius="6px"
            bg={isDayAfterTomorrow(value) ? colors.secondary.button : 'white'}
            color={isDayAfterTomorrow(value) ? 'white' : "#505CC8"}
            borderColor="#505CC8"
            _hover={{ bg: isDayAfterTomorrow(value) ? colors.secondary.buttonColor : 'gray.50' }}
            fontSize="13px"
            fontWeight="500"
            px="10px"
            py="6.5px"
          >
            Послезавтра
          </Button>
        </Flex>
      </Flex>

      {isCalendarOpen && (
        <Box
          position="absolute"
          zIndex="9999"
          mt={2}
          bg="white"
          boxShadow="xl"
          borderRadius="md"
          left="0"
          width="auto"
          overflow="visible"
          pointerEvents="auto"
        >
          <Box sx={{
            '.custom-datepicker': {
              fontFamily: 'inherit',
              border: 'none !important',
              boxShadow: 'none !important',
              zIndex: '9999 !important',
              position: 'relative !important'
            },
            '.react-datepicker__month-container': {
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '8px'
            },
            '.react-datepicker__day--selected': {
              backgroundColor: '#505CC8 !important',
              color: 'white !important'
            },
            '.react-datepicker__day:hover': {
              backgroundColor: '#e6e8ff !important'
            }
          }}>
            <DatePicker
              selected={value}
              onChange={handleDatePickerChange}
              inline
              minDate={today}
              className="custom-datepicker"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
