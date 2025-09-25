'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Medal, Shield } from 'lucide-react';
import type { UserGrade, UserRole } from '@prisma/client';

export type UserRow = {
  id: string;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  role: UserRole;
  grade: UserGrade;
};

const GRADES: UserGrade[] = ['ADMIN', 'MANAGER', 'MODERATOR', 'NONE'];
const ROLES: UserRole[] = [
  'USER',
  'APEL',
  'OGEC',
  'PS',
  'MS',
  'GS',
  'CE1',
  'CE2',
  'CM1',
  'CM2',
];

export const UsersColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: 'lastname',
    header: 'Nom',
    cell: ({ row }) => <span>{row.original.lastname || ''}</span>,
  },
  {
    accessorKey: 'firstname',
    header: 'Prénom',
    cell: ({ row }) => <span>{row.original.firstname || ''}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span>{row.original.email || ''}</span>,
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
    cell: ({ row }) => <span>{row.original.grade}</span>,
  },
  {
    accessorKey: 'role',
    header: 'Rôle',
    cell: ({ row }) => <span>{row.original.role}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;

      const updateGrade = async (grade: UserGrade) => {
        const res = await fetch(`/api/users/${id}/grade`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ grade }),
        });
        if (res.ok) router.refresh();
        else alert((await res.json()).error || "Impossible de changer le grade");
      };

      const updateRole = async (role: UserRole) => {
        const res = await fetch(`/api/users/${id}/role`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role }),
        });
        if (res.ok) router.refresh();
        else alert((await res.json()).error || "Impossible de changer le rôle");
      };

      return (
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Changer le grade">
                <Medal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {GRADES.map((g) => (
                <DropdownMenuItem key={g} onClick={() => updateGrade(g)}>
                  {g}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Changer le rôle">
                <Shield className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {ROLES.map((r) => (
                <DropdownMenuItem key={r} onClick={() => updateRole(r)}>
                  {r}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

