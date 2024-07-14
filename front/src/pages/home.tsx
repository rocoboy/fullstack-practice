import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { addClients, deleteClient } from "../store/slices/clientSlice";
import { eliminarCliente, fetchAllClients } from "../lib/clients";
import EditClientModal from "../components/EditClientModal";
import { Client } from "../models/Client";

export default function Home(){

    const clients = useSelector((state: RootState) => state.client.clients);
    const dispatch = useDispatch();
    const emptyClient: Client = {
        email: "",
        firstname: "",
        lastname: "",
        age: 0,
        id: 0
    }
    const [selectedClient, setSelectedClient] = useState<Client>(emptyClient);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const getClients = async () => {
          try {
            const newClients = await fetchAllClients();
            if (newClients){
              dispatch(addClients(newClients));
            }
          } catch(error){
            console.error(error);
          }
        }
        
        if (clients.length === 0){
          getClients();
        }
    }, [clients.length, dispatch]);
      

    const handleEdit = (id: number) => {
        const client = clients.find((client) => client.id === id);
        if (client){
          setSelectedClient(client);
          setOpenModal(true);
        }
      };
      
    
    const handleDelete = async (id: number) => {
        const client = clients.find((client) => client.id === id);
        if (client){
            dispatch(deleteClient(client.email));
            await eliminarCliente(client.id);
        }
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCreate = () => {
        setSelectedClient(emptyClient);
        setOpenModal(true);
    }
    
    return(
        <Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">First name</TableCell>
                    <TableCell align="center">Last name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell align="center">Opciones</TableCell> {/* Nueva columna para acciones */}
                </TableRow>
                </TableHead>
                <TableBody>
                {clients.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                        {row.firstname}
                    </TableCell>
                    <TableCell align="center">{row.lastname}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.age}</TableCell>
                    <TableCell align="center">
                        <Button variant="contained" color="primary" sx={{margin:"10px"}} onClick={() => handleEdit(row.id)}>
                            Editar
                        </Button>
                        <Button variant="contained" color="error" sx={{margin:"10px"}} onClick={() => handleDelete(row.id)}>
                            Eliminar
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>


            <Button variant="contained"  sx={{margin:"10px", backgroundColor:"green"}} onClick={() => handleCreate()}>
                 Agregar Cliente
            </Button>

            {/* Modal para editar cliente */}
            {selectedClient && 
            <EditClientModal
                open={openModal}
                onClose={handleCloseModal}
                editedClient={selectedClient}
                setEditedClient={setSelectedClient}
            />}
        </Box>
    );
}