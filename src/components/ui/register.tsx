import React, { useState } from "react";
import api from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Register = (isAdmin:boolean) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workSchedule, setWorkSchedule] = useState("EIGHT_HOURS");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      workSchedule,
    };

    try {
      const endpoint = isAdmin ? "auth/admin/register" : "auth/register"
      const response = await api.post(endpoint, data);
      setMessage(response.data.message || "Registrado com sucesso!");

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMessage(error.response?.data.message || "Erro ao registrar.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex items-center justify-start mb-6">
        <button
          onClick={() => navigate("/login")}
          className="mr-5"
          aria-label="Voltar para o login"
        >
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-semibold text-center ml-5">Cadastre-se</h2>
      </div>

      {message && <p className="mb-4 text-center text-red-500">{message}</p>}

      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block mb-2">Nome:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Senha:</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Carga Horária:</label>
          <select
            value={workSchedule}
            onChange={(e) => setWorkSchedule(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="EIGHT_HOURS">Oito Horas</option>
            <option value="SIX_HOURS">Seis Horas</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </form>
    </div>
  );
};

export default Register;
