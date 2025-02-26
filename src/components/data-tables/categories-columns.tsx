'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CategoriesCellAction } from '@/components/category/categories-cell-action';

export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string;
	createAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'billboard',
		header: 'Billboard',
		cell: ({ row }) => row.original.billboardLabel,
	},
	{
		accessorKey: 'createAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CategoriesCellAction data={row.original} />,
	},
];
