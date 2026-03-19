import prisma from '../../../../../lib/prisma';
import { saveBrand } from '../../../../../actions/admin';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function EditBrandPage({ params: { locale, id } }: { params: { locale: string, id: string } }) {
  let brand = null;
  if (id !== 'new') {
    brand = await prisma.brandLogo.findUnique({ where: { id } });
  }

  async function onSubmit(formData: FormData) {
    'use server';
    await saveBrand(formData);
    redirect(`/${locale}/admin/brands`);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{id === 'new' ? 'Add Brand' : 'Edit Brand'}</h1>
        <Link href={`/${locale}/admin/brands`} className="text-gray-500 hover:text-primary flex items-center gap-2 font-medium">
          <ArrowLeft className="w-5 h-5 rtl:rotate-180" /> Back
        </Link>
      </div>

      <form action={onSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl space-y-6">
        <input type="hidden" name="id" value={id} />
        
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Brand Name</label>
          <input type="text" name="brandName" defaultValue={brand?.brandName || ''} className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Logo Image File</label>
          <div className="flex flex-col gap-3">
            {brand?.logoUrl && (
               <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <img src={brand.logoUrl} alt="Current" className="w-16 h-10 object-contain bg-white rounded border border-gray-100 p-1" />
                  <span className="text-sm font-medium text-gray-500 truncate" title={brand.logoUrl}>Current: {brand.logoUrl}</span>
               </div>
            )}
            <input type="hidden" name="logoUrl" value={brand?.logoUrl || ''} />
            <input 
              type="file" 
              name="logoFile" 
              accept="image/*" 
              className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
            />
            <p className="text-xs text-gray-500 font-medium">Upload a new image to override the current one.</p>
          </div>
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-900 mb-2">Display Order Index (Low evaluates first)</label>
           <input type="number" name="orderIndex" defaultValue={brand?.orderIndex || 0} className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-primary transition-all" />
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
          <input type="checkbox" name="isVisible" defaultChecked={brand?.isVisible ?? true} className="w-6 h-6 rounded text-primary focus:ring-primary border-gray-300" />
          <label className="text-base font-semibold text-gray-900">Visible in Public Carousel</label>
        </div>

        <button type="submit" className="mt-8 bg-primary text-white font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors w-full md:w-auto shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          <Save className="w-5 h-5" /> Save Brand Details
        </button>
      </form>
    </div>
  );
}
