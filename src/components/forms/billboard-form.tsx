'use client';

import { FC, useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { Billboard } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { AlertModal } from '@/components/modals/alert-modal';
import { ImageUpload } from '@/components/ui/image-upload';

const formSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
	initialData: Billboard | null;
}

export const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const title = initialData ? 'Edit billboard' : 'Create billboard';
	const description = initialData ? 'Edit a billboard' : 'Add a new billboard';
	const toastMessage = initialData ? 'Billboard updated' : 'Billboard Created';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<BillboardFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: '',
		},
	});

	const onSubmit = async (data: BillboardFormValues) => {
		try {
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/billboards/${params.billboardId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/billboards`, data);
			}
			setLoading(true);
			router.push(`/${params.storeId}/billboards`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			console.log(error);

			toast.error('Somthing went wrong!');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(
				`/api/${params.storeId}/billboards/${params.billboardId}`
			);
			router.push('/');
			router.refresh();
			toast.success('Billboard deleted');
		} catch {
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
				loading={loading}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
			/>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant={'destructive'}
						size={'icon'}
						onClick={() => setOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Background Image</FormLabel>
									<FormControl>
										<ImageUpload
											value={field.value ? [field.value] : []}
											disabled={loading}
											onChange={(url) => field.onChange(url)}
											onRemove={() => field.onChange('')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Label</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												placeholder="Billboard label"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
