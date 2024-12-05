import React, { useState } from "react";
import api from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("auth/register", { name, email, password });
      setMessage(response.data.message || "Registrado com sucesso!");

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMessage(error.response?.data.message || "Erro ao registrar.");
    }
  };
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex items-center justify-start mb-6">
      <a onClick={()=> navigate('/login')} className="mr-5"><ArrowLeft /></a>
      <h2 className="text-2xl font-semibold text-center ml-5">Cadastre-se</h2>
      </div>
     
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome:</label>
          <Input
            className='mb-4'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            className='mb-4'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <Input
            className='mb-4'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Registrar</Button>
      </form>
    </div>
  );
};

export default Register;
