import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { Navbar } from '@/components/navbar';
import { getStores } from '@/actions/get-stores';

export default async function DashboardLayout({
	children,
}: // params,
{
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const { userId } = await auth();

	if (!userId) {
		redirect('/sign-in');
	}

	const stores = await getStores();

	if (stores.length === 0) {
		redirect('/');
	}

	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}
