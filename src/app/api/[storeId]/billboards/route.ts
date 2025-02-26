import { db } from '@/db';
import { billboards, stores } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = await auth();
		const body = await req.json();

		const { label, imageUrl } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated!', { status: 401 });
		}
		if (!label) {
			return new NextResponse('Label is required!', { status: 400 });
		}
		if (!imageUrl) {
			return new NextResponse('image URL is required!', { status: 400 });
		}
		if (!params.storeId) {
			return new NextResponse('Store id is required!', { status: 400 });
		}

		// const storeByUserId = await db.store.findFirst({
		// 	where: {
		// 		id: params.storeId,
		// 		userId,
		// 	},
		// });
		const storeByUserId = await db
			.select()
			.from(stores)
			.where(and(eq(stores.id, params.storeId), eq(stores.userId, userId)));

		if (!storeByUserId) {
			return new NextResponse('Unauthorized!', { status: 403 });
		}

		// const billboard = await db.billboard.create({
		// 	data: {
		// 		label,
		// 		imageUrl,
		// 		storeId: params.storeId,
		// 	},
		// });

		const billboard = await db
			.insert(billboards)
			.values({
				...body,
				userId,
				id: createId(),
			})
			.returning();

		revalidatePath('/');
		revalidatePath(`/${params.storeId}/billboards`);

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARDS_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { storeId } = await params;
		console.log('PARAMS_STORE_ID', storeId);

		if (!storeId) {
			return new NextResponse('Store id is required!', { status: 400 });
		}

		// const billboards = await db.billboard.findMany({
		// 	where: {
		// 		storeId: params.storeId,
		// 	},
		// });

		const data = await db
			.select()
			.from(billboards)
			.where(eq(billboards.storeId, storeId));
		console.log(data);

		return NextResponse.json(data);
	} catch (error) {
		console.log('[BILLBOARDS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
