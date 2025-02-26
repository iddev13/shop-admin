'use server'

import axios from 'axios';
import { z } from 'zod';

import { insertStoresSchema } from '@/db/schema';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores`;

type Props = z.infer<typeof insertStoresSchema>;

export async function getStores() {
	return (await axios.get<Props[]>(URL)).data;
}
