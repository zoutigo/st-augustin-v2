import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'name',
    header: 'Nom de la Page',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date de Création',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
];
