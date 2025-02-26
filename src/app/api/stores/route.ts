import { db } from '@/db';
import { stores } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';

export async function GET() {
	try {
		const data = await db
			.select({
				id: stores.id,
				userId: stores.userId,
				name: stores.name,
			})
			.from(stores);

		return NextResponse.json(data);
	} catch (error) {
		console.log('[STORES_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
export async function POST(req: Request) {
	try {
		const { userId } = await auth();

		if (!userId) return new NextResponse('Unauthorized', { status: 401 });

		const body = await req.json();

		const data = await db
			.insert(stores)
			.values({
				...body,
				userId,
				id: createId(),
			})
			.returning();

		revalidatePath('/');
		revalidatePath('/stores');

		return NextResponse.json(data[0]);
	} catch (error) {
		console.log('[STORES_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
