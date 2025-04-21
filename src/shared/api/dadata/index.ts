import axios from 'axios';

const DADATA_API_KEY = import.meta.env.VITE_DADATA_API_KEY;
const DADATA_BASE_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs';

const dadataApi = axios.create({
  baseURL: DADATA_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Token ${DADATA_API_KEY}`
  }
});

interface DadataAddressSuggestion {
  value: string;
  unrestricted_value: string;
  data: Record<string, any>;
}

interface DadataResponse {
  suggestions: DadataAddressSuggestion[];
}

export const fetchAddressSuggestions = async (query: string): Promise<DadataAddressSuggestion[]> => {
  try {
    const response = await dadataApi.post<DadataResponse>('/suggest/address', {
      query,
      count: 5
    });

    return response.data.suggestions;
  } catch (error) {
    console.error('Ошибка при получении подсказок адреса:', error);
    return [];
  }
};
