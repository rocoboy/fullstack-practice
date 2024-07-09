import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAccountByEmail } from '../lib/authentication';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice';

export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogin(){
        const account = await fetchAccountByEmail(email);
        try{
            if (account && account.password === password){
                dispatch(login(account));
                navigate("/home");
            } else {
                setMessage("contraseña incorrecta");
            }
        }catch(error){
            console.error(error);
        }
    }

    return (
        <Box>
            <Container maxWidth="sm" sx={{backgroundColor:"white", borderRadius:"10px", padding:"20px"}}>
                <Typography variant="h4" gutterBottom sx={{color:"black"}}>
                    Login
                </Typography>
                <form >
                    <div style={{ marginBottom: '16px' }}>
                        <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        />
                    </div>
                    <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                        Login
                    </Button>
                </form>
                <Typography  sx={{color:"black", margin:"5px"}}>
                    {message}
                </Typography>
            </Container>
        </Box>
    );
}
