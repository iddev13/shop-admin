'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColorCellAction } from '../colors/color-cell-action';

export type ColorsColumn = {
	id: string;
	name: string;
	value: string;
	createAt: string;
};

export const columns: ColumnDef<ColorsColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'value',
		header: 'Value',
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.value}
				<div
					className="h-6 w-6 rounded-full border"
					style={{ backgroundColor: row.original.value }}
				/>
			</div>
		),
	},
	{
		accessorKey: 'createAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <ColorCellAction data={row.original} />,
	},
];
