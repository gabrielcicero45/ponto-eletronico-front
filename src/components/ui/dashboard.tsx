import { DataTable } from "@/components/ui/data-table"
import { columns, WorkPoint} from "@/data/workPoints"
import {  useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext';
import {  calculateDaySummary, fetchWorkPoints, getCurrentUser, registerWorkPoints } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";



function Dashboard() {
  
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const token = localStorage.getItem("token");
  const [workPoints, setWorkPoints] = useState<WorkPoint[]>([]);
  const [daySummary, setDaySummary] = useState<{
    totalHoursWorked: number;
    isComplete: boolean;
    remainingHours: number;
    exceededHours: number;
  }>({
    totalHoursWorked: 0,
    isComplete: false,
    remainingHours: 8,
    exceededHours: 0
  });
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
        setDaySummary(calculateDaySummary(workPoints,currentUser.workSchedule === "EIGHT_HOURS" ? 8 : 6));
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
    

    {currentUser.userType === 'ADMIN' ? <Button onClick={() => navigate("/register")}>Cadastre um Novo Funcionario</Button> : null}
    <Button onClick={() => registerWorkPoints(token) } className="mx-4">Bater Ponto</Button>
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-bold">Resumo da Jornada</h2>
      <p>Total de horas trabalhadas: {daySummary.totalHoursWorked}</p>
      <p>
        Jornada completa:{" "}
        <span className={daySummary.isComplete ? "text-green-600" : "text-red-600"}>
          {daySummary.isComplete ? "Sim" : "Não"}
        </span>
      </p>
      <p>
        Horas restantes para completar: {daySummary.remainingHours}
      </p>
      <p>Horas excedidas (extras): {daySummary.exceededHours}</p>
    </div>
    <DataTable columns={columns} data={workPoints} />
  </div>);
}

export default Dashboard;