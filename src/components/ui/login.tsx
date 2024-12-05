import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { Input } from '@/components/ui/input';

function Login() {
    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      try {
        const response = await api.post("auth/login", { email, password });
        const { token } = response.data;
  
        localStorage.setItem("token", token);
        
        login();

        navigate('/dashboard');

      } catch (err) {
        setError(err.response?.data?.message || "Erro ao realizar login.");
      }
    };
    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label>Email:</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label>Senha:</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="flex p-4 items-center justify-center">
                <Button type="submit" className='mr-4'>Entrar</Button> 
                <Button onClick={() => navigate("/register")}>Cadastre-se</Button>
                </div>
                
            </form>
        </div>
    );
}

export default Login;
