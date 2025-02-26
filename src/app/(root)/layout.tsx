import { getStores } from '@/actions/get-stores';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		redirectToSignIn();
	}

	const stores = await getStores();

	if (stores.length !== 0) {
		redirect(`/${stores[0].id}`);
	}

	return <>{children}</>;
}
