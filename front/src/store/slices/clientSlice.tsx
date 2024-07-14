import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Asegúrate de importar AppThunk y RootState

export interface Client {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
}

export interface ClientState {
  clients: Client[];
}

const initialState: ClientState = {
  clients: [],
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<Client>) => {
      const emailExists = state.clients.some(client => client.email === action.payload.email);
      if (!emailExists) {
        state.clients.push(action.payload);
      }
    },
    updateClient: (state, action: PayloadAction<{ email: string; updatedClient: Client }>) => {
      const index = state.clients.findIndex(client => client.email === action.payload.email);
      if (index !== -1) {
        state.clients[index] = action.payload.updatedClient;
      }
    },
    deleteClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter(client => client.email !== action.payload);
    },
    setClients: (state, action: PayloadAction<Client[]>) => {
      state.clients = action.payload;
    },
    addClients: (state, action: PayloadAction<Client[]>) => {
      // filtramos los clientes para evitar duplicados
      const uniqueClients = action.payload.filter(newClient =>
        !state.clients.some(existingClient => existingClient.email === newClient.email)
      );
      state.clients.push(...uniqueClients);
    },
  },
});

export const { addClient, updateClient, deleteClient, setClients, addClients } = clientSlice.actions;

export default clientSlice.reducer;

// Selector para obtener la lista de clientes
export const selectClients = (state: RootState) => state.client.clients;