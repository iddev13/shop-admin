'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

export const ImageUpload = ({
	disabled,
	onChange,
	onRemove,
	value,
}: ImageUploadProps) => {
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		console.log(result);

		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div
						key={url}
						className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
					>
						<div className="z-10 absolute top-2 right-2">
							<Button
								type="button"
								onClick={() => onRemove(url)}
								variant={'destructive'}
								size={'icon'}
							>
								<Trash className="w-4 h-4" />
							</Button>
						</div>
						<Image src={url} className="object-cover" alt="Image" fill />
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset="gnhhjzlu">
				{({ open }) => {
					const onClick = () => {
						open();
					};
					return (
						<Button
							type="button"
							disabled={disabled}
							variant={'secondary'}
							onClick={onClick}
						>
							<ImagePlus className="w-4 h-4 mr-2" />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};
