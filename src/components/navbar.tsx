import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { StoreSwitcher } from '@/components/store-switcher';
import { getStores } from '@/actions/get-stores';

export const Navbar = async () => {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		redirectToSignIn();
	}

	const stores = await getStores();

	return (
		<div className="border-b">
			<div className="flex items-center h-16 px-4">
				<StoreSwitcher items={stores} />
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<ThemeToggle />
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
		</div>
	);
};
