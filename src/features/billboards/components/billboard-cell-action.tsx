import { FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { BillboardColumn } from '@/features/billboards/components/billboards-columns';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modals/alert-modal';

interface CellActionProps {
	data: BillboardColumn;
}

export const BillboardCellAction: FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success('Billboard id copy to the clipboard');
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
			router.push(`/${params.storeId}/billboards`);
			router.refresh();
			toast.success('Billboard deleted');
		} catch (error) {
			console.log(error);
			toast.error(
				'Make sure you removed all categories using this billboard first!'
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={'ghost'} className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Action</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className="mr-2 w-4 h-4" />
						Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(`/${params.storeId}/billboards/${data.id}`)
						}
					>
						<Edit className="mr-2 w-4 h-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className="mr-2 w-4 h-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
