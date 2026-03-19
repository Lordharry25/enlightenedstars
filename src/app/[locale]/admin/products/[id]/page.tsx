import prisma from '../../../../../lib/prisma';
import { saveProduct } from '../../../../../actions/admin';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function EditProductPage({ params: { locale, id } }: { params: { locale: string, id: string } }) {
  let product = null;
  if (id !== 'new') {
    product = await prisma.product.findUnique({ where: { id } });
  }

  // Wrap server action to also trigger redirect safely
  async function onSubmit(formData: FormData) {
    'use server';
    await saveProduct(formData);
    redirect(`/${locale}/admin/products`);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{id === 'new' ? 'Add Product' : 'Edit Product'}</h1>
        <Link href={`/${locale}/admin/products`} className="text-gray-500 hover:text-primary flex items-center gap-2 font-medium">
          <ArrowLeft className="w-5 h-5 rtl:rotate-180" /> Back
        </Link>
      </div>

      <form action={onSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl space-y-6">
        <input type="hidden" name="id" value={id} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Name (English)</label>
            <input type="text" name="name_en" defaultValue={product?.name_en || ''} className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 md:text-end">Name (Arabic) / الاسم</label>
            <input type="text" name="name_ar" defaultValue={product?.name_ar || ''} dir="rtl" className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Description (English)</label>
            <textarea name="description_en" rows={5} defaultValue={product?.description_en || ''} className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all resize-none" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 md:text-end">Description (Arabic) / الوصف</label>
            <textarea name="description_ar" rows={5} defaultValue={product?.description_ar || ''} dir="rtl" className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all resize-none" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Category (e.g. Beverages)</label>
            <input type="text" name="category" defaultValue={product?.category || ''} className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Product Image File</label>
            <div className="flex flex-col gap-3">
              {product?.imageUrl && (
                 <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <img src={product.imageUrl} alt="Current" className="w-12 h-12 object-contain bg-white rounded-lg border border-gray-100 p-1" />
                    <span className="text-sm font-medium text-gray-500 truncate max-w-[200px]" title={product.imageUrl}>Current: {product.imageUrl}</span>
                 </div>
              )}
              <input type="hidden" name="imageUrl" value={product?.imageUrl || ''} />
              <input 
                type="file" 
                name="imageFile" 
                accept="image/*" 
                className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
              />
              <p className="text-xs text-gray-500 font-medium">Upload a new image to override the current one.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
          <input type="checkbox" name="isVisible" defaultChecked={product?.isVisible ?? true} className="w-6 h-6 rounded text-primary focus:ring-primary border-gray-300" />
          <label className="text-base font-semibold text-gray-900">Visible on Public Catalog</label>
        </div>

        <button type="submit" className="mt-8 bg-primary text-white font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors w-full md:w-auto shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          <Save className="w-5 h-5" /> Save Product Details
        </button>
      </form>
    </div>
  );
}
