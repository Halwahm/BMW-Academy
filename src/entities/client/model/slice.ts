import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientState } from './types';
import clientsData from '../../../data/clients.json';

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    return clientsData;
  }
);

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке клиентов';
      });
  },
});

export default clientSlice.reducer;
