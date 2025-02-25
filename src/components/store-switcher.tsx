'use client';

import { FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { insertStoresSchema } from '@/db/schema';
import { useStoreModal } from '@/hooks/use-store-modal';
import {
	Check,
	ChevronsUpDown,
	PlusCircle,
	Store as StoreIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { z } from 'zod';

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

type Stores = z.infer<typeof insertStoresSchema>;

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Stores[];
	className?: string;
}

export const StoreSwitcher: FC<StoreSwitcherProps> = ({
	className,
	items = [],
}) => {
	const storeModal = useStoreModal();
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					size={'sm'}
					aria-expanded={open}
					role="combobox"
					aria-label="Store"
					className={cn('w-[200px] justify-between', className)}
				>
					<StoreIcon className="mr-2 h-4 w-4" />
					{currentStore?.label}
					<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search store..." />
						<CommandEmpty>No store found</CommandEmpty>
						<CommandGroup heading="Stores">
							{formattedItems.map((store) => {
								return (
									<CommandItem
										key={store.value}
										onSelect={() => onStoreSelect(store)}
										className="text-sm"
									>
										<StoreIcon className="mr-2 h-4 w-4" />
										{store.label}
										<Check
											className={cn(
												'ml-auto h-4 w-4',
												currentStore?.value === store.value
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup heading="Create Store">
							<CommandItem
								onSelect={() => {
									setOpen(false);
									storeModal.onOpen();
								}}
								className="cursor-pointer"
							>
								<PlusCircle className="mr-2 h-5 w-5" />
								Create Store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
