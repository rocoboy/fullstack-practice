import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { updateClient, addClient } from "../store/slices/clientSlice";
import { Client } from '../models/Client';
import { crearCliente, editarCliente } from '../lib/clients';

interface EditClientModalProps {
  open: boolean;
  onClose: () => void;
  editedClient: Client;
  setEditedClient: React.Dispatch<React.SetStateAction<Client>>
}

export default function EditClientModal ({open, onClose, editedClient, setEditedClient} : EditClientModalProps) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const isNewClient = editedClient.id == 0;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedClient((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
    setMessage("");
  };

  const handleSave = async () => {
    if (isNewClient){
      editedClient.id = 1;
      dispatch(addClient(editedClient));
      try{
        await crearCliente(editedClient);
      } catch(error: any){
        setMessage(error.toString());
      }
    } else{
        dispatch(updateClient({ email: editedClient.email, updatedClient: editedClient }));
        try{
          await editarCliente(editedClient.id, editedClient);
        } catch(error: any){
          setMessage(error.toString());
        }
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
        <Typography  sx={{color:"black", margin:"5px"}}>
          {message}
        </Typography>
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