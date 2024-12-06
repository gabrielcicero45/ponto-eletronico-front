import { WorkPoint } from "@/data/workPoints";
import axios from "axios";
import { differenceInSeconds, parseISO } from "date-fns";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCurrentUser = async (token) => {
  const response = await api.get("/auth/me",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const registerWorkPoints = async (token) => {
  console.log(new Date().toISOString())
  const response = await api.post("/points",{timestamp: new Date().toISOString(),},{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchWorkPoints = async () => {
  const response = await api.get("/points/me");
  return response.data;
};


export const calculateDaySummary = (
  workPoints: WorkPoint[],
  dailyWorkHours: number
): {
  totalHoursWorked: string;
  isComplete: boolean;
  remainingHours: string;
  exceededHours: string;
} => {
  const sortedPoints = workPoints
    .map((point) => parseISO(point.timestamp))
    .sort((a, b) => a.getTime() - b.getTime());

  let totalSecondsWorked = 0;
  for (let i = 0; i < sortedPoints.length; i += 2) {
    if (i + 1 < sortedPoints.length) {
      totalSecondsWorked += differenceInSeconds(sortedPoints[i + 1], sortedPoints[i]);
    }
  }

  const formatHoursAndMinutes = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} horas e ${minutes} minutos`;
  };


  const totalHoursWorkedString = formatHoursAndMinutes(totalSecondsWorked);

  const remainingSeconds = Math.max(dailyWorkHours * 3600 - totalSecondsWorked, 0);
  const exceededSeconds = Math.max(totalSecondsWorked - dailyWorkHours * 3600, 0);

  const remainingHoursString = formatHoursAndMinutes(remainingSeconds);
  const exceededHoursString = formatHoursAndMinutes(exceededSeconds);

  const isComplete = totalSecondsWorked >= dailyWorkHours * 3600;

  return {
    totalHoursWorked: totalHoursWorkedString,
    isComplete,
    remainingHours: remainingHoursString,
    exceededHours: exceededHoursString,
  };
};



export default api;