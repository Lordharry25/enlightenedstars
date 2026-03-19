import prisma from '../../../../lib/prisma';
import { deleteBrand } from '../../../../actions/admin';
import { Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

export default async function AdminBrandsPage({ params: { locale } }: { params: { locale: string } }) {
  const brands = await prisma.brandLogo.findMany({ orderBy: { orderIndex: 'asc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Brands</h1>
        <Link href={`/${locale}/admin/brands/new`} className="bg-primary hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-sm hover:shadow-md">
          <Plus className="w-5 h-5" /> Add Brand
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full text-start">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm tracking-wider uppercase">
            <tr>
              <th className="py-5 px-6 font-semibold text-start">Logo</th>
              <th className="py-5 px-6 font-semibold text-start">Brand Name</th>
              <th className="py-5 px-6 font-semibold text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {brands.map(b => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="w-20 h-12 bg-white rounded-lg border border-gray-100 p-2 flex items-center justify-center">
                    <img src={b.logoUrl} alt="" className="max-w-full max-h-full object-contain grayscale" />
                  </div>
                </td>
                <td className="py-4 px-6 font-bold text-gray-900">{b.brandName}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2 text-end h-full">
                    <Link href={`/${locale}/admin/brands/${b.id}`} className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"><Edit className="w-5 h-5" /></Link>
                    <form action={async () => { 'use server'; await deleteBrand(b.id); }}>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
