import { format } from 'date-fns';

import { BillboardClient } from '@/features/billboards/components/billboard-client';
import { getBillboards } from '@/actions/get-billboards';
import { BillboardColumn } from '@/features/billboards/components/billboards-columns';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
	const { storeId } = await params;
	const billboards = await getBillboards(storeId);
	console.log('BILLBOARDS_PAGE', billboards);

	const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
		id: item.id,
		label: item.label,
		createAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				Billboards
				<BillboardClient data={formattedBillboards} />
			</div>
		</div>
	);
};

export default BillboardsPage;
