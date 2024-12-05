import { DataTable } from "@/components/ui/data-table"
import { columns, WorkPoint} from "@/data/workPoints"
import {  useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext';
import {  fetchWorkPoints, getCurrentUser, registerWorkPoints } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";



function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const token = localStorage.getItem("token");
  const [workPoints, setWorkPoints] = useState<WorkPoint[]>([]);
  useMemo(async () => {
    const currentUser = await getCurrentUser(token);
    setCurrentUser(currentUser);
  }, []);

  useEffect(() => {
    const loadWorkPoints = async () => {
      try {
        const data = await fetchWorkPoints();
        console.log(data)
        setWorkPoints(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadWorkPoints();
  }, [workPoints]);
  
  return (<div className="container mx-auto py-10">
    {currentUser ? (<div className="flex items-center my-4 justify-end">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
      </Avatar>
      <p className="mx-4">{currentUser?.name}</p>
      <a onClick={() => { logout(); navigate("/login") }}><LogOut /></a>
    </div>) : <p>Carregando dados...</p>}


    <h1 className="text-2xl text-center">Controle de Inquilinos</h1>
    <Button onClick={() => registerWorkPoints(token) } className="mx-4">Bater Ponto</Button>
    
    <DataTable columns={columns} data={workPoints} />
  </div>);
}

export default Dashboard;