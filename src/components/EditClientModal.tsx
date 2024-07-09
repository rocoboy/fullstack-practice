import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { updateClient, addClient } from "../store/slices/clientSlice";
import { fetchClientByEmail } from '../lib/clients';
import { Client } from '../models/Client';

interface EditClientModalProps {
  open: boolean;
  onClose: () => void;
  editedClient: Client;
  setEditedClient: React.Dispatch<React.SetStateAction<Client>>
}

export default function EditClientModal ({open, onClose, editedClient, setEditedClient} : EditClientModalProps) {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedClient((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (await fetchClientByEmail(editedClient.email)){
        dispatch(updateClient({ email: editedClient.email, updatedClient: editedClient }));
    } else{
        dispatch(addClient(editedClient));
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Editar Cliente
        </Typography>
        <TextField
          fullWidth
          name="firstname"
          label="Nombre"
          value={editedClient.firstname}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="lastname"
          label="Apellido"
          value={editedClient.lastname}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={editedClient.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="age"
          label="Edad"
          type="number"
          value={editedClient.age != 0 ? editedClient.age : undefined}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
        <Button variant="contained" color="error" onClick={onClose} sx={{ ml: 2 }}>
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};