export const formatPhone = (phone: string): string => {
  if (!phone) return '';

  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length === 11 && (cleanPhone.startsWith('7') || cleanPhone.startsWith('8'))) {
    const code = cleanPhone.slice(1, 4);
    const firstPart = cleanPhone.slice(4, 7);
    const secondPart = cleanPhone.slice(7, 9);
    const thirdPart = cleanPhone.slice(9, 11);

    return `+7 (${code}) ${firstPart}-${secondPart}-${thirdPart}`;
  }

  return phone;
};
