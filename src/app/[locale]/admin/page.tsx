import prisma from '../../../lib/prisma';
import { Package, Image as ImageIcon } from 'lucide-react';

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const brandsCount = await prisma.brandLogo.count();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-8 hover:shadow-md transition-shadow">
          <div className="bg-blue-50 p-5 rounded-2xl text-primary"><Package className="w-10 h-10" /></div>
          <div>
            <div className="text-4xl font-black text-gray-900 mb-1">{productsCount}</div>
            <div className="text-gray-500 font-semibold tracking-wide uppercase text-sm">Total Products</div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-8 hover:shadow-md transition-shadow">
          <div className="bg-blue-50 p-5 rounded-2xl text-primary"><ImageIcon className="w-10 h-10" /></div>
          <div>
            <div className="text-4xl font-black text-gray-900 mb-1">{brandsCount}</div>
            <div className="text-gray-500 font-semibold tracking-wide uppercase text-sm">Active Brands</div>
          </div>
        </div>
      </div>
    </div>
  );
}
