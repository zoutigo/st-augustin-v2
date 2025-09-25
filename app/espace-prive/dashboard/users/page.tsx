import React from 'react';
import { getAllUsers } from '@/actions/users/get';
import { DataTable } from '@/components/data-table';
import { UsersColumns, type UserRow } from '@/components/dashboard/users/users-columns';

const UsersPage = async () => {
  let users: UserRow[] = [];
  let error: string | null = null;

  try {
    const result = await getAllUsers();
    if ('error' in (result as any)) {
      error = (result as any).error;
    } else {
      users = result as UserRow[];
    }
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold flex-grow">Liste des utilisateurs</h1>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="rounded-md border border-gray-200 shadow-sm">
        <DataTable data={users} columns={UsersColumns} />
      </div>
    </div>
  );
};

export default UsersPage;

