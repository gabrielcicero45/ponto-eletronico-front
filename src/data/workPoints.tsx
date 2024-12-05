"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type WorkPoint = {
  id: string;
  timestamp: Date;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export const columns: ColumnDef<WorkPoint>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ table, row }) => {
      const index = table.getCoreRowModel().rows.indexOf(row); // Obtem o índice da linha
      return index % 2 === 0 ? "Entrada" : "Saída";
    },
  },
  {
    accessorKey: "timestamp",
    header: "Horario",
    cell: ({ row }) => (
      <span>{formatDate(row.getValue("timestamp"))}</span>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const workPointId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log(workPointId)}>
              Remover 
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
