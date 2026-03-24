import prisma from '../../../../lib/prisma';
import { deleteProduct } from '../../../../actions/admin';
import { Plus, Edit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { blurPlaceholder } from '../../../../utils/imageLoader';
import DeleteButton from '../../../../components/DeleteButton';

export default async function AdminProductsPage({ params: { locale } }: { params: { locale: string } }) {
  const products = await prisma.product.findMany({ 
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name_en: true,
      category: true,
      imageUrl: true,
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        <Link href={`/${locale}/admin/products/new`} className="bg-primary hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-sm hover:shadow-md">
          <Plus className="w-5 h-5" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full text-start">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm tracking-wider uppercase">
            <tr>
              <th className="py-5 px-6 font-semibold text-start">Image</th>
              <th className="py-5 px-6 font-semibold text-start">Name (EN)</th>
              <th className="py-5 px-6 font-semibold text-start">Category</th>
              <th className="py-5 px-6 font-semibold text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="relative w-14 h-14 bg-white rounded-lg border border-gray-100 p-1 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={p.imageUrl} 
                      alt={p.name_en}
                      fill
                      sizes="56px"
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                      className="object-contain p-1"
                    />
                  </div>
                </td>
                <td className="py-4 px-6 font-bold text-gray-900">{p.name_en}</td>
                <td className="py-4 px-6">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{p.category}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2 text-end h-full">
                    <Link href={`/${locale}/admin/products/${p.id}`} className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"><Edit className="w-5 h-5" /></Link>
                    <DeleteButton 
                      action={async () => { 'use server'; await deleteProduct(p.id); }}
                      itemName={p.name_en}
                    />
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
