'use server';

import axios from 'axios';
import { z } from 'zod';

import { insertBillboardsSchema } from '@/db/schema';

type Props = z.infer<typeof insertBillboardsSchema>;

export async function getBillboards(storeId: string) {
	const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/billboards`;
	return (await axios.get<Props[]>(URL)).data;
}
