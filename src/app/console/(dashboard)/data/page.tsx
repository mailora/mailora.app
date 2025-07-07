import { headers } from 'next/headers';
import Link from 'next/link';

import { auth } from '@/lib/auth';

export default async function Page() {
  // const products = await polarApi.products.list({});
  const headerList = await headers();
  const productId = '24b189a4-abca-4e6e-a00e-217f8b514b79';
  const session = await auth.api.getSession({
    headers: headerList,
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Polar Dashboard</h1>
      <p className="text-lg">This is the Polar dashboard page.</p>
      <Link
        href={`/checkout?products=${productId}&customerEmail=${session?.user.email}`}
        key={productId}
        className="p-4 border rounded shadow"
      >
        Jump Here
      </Link>
    </div>
  );
}
