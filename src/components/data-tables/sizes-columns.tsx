'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SizeCellAction } from '@/components/sizes/size-cell-action';

export type SizesColumn = {
	id: string;
	name: string;
	value: string;
	createAt: string;
};

export const columns: ColumnDef<SizesColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'value',
		header: 'Value',
	},
	{
		accessorKey: 'createAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <SizeCellAction data={row.original} />,
	},
];
