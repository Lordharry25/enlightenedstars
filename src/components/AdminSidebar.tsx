import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Image as ImageIcon, LogOut, Globe } from 'lucide-react';
import { signOut } from '../auth';

export default function AdminSidebar({ locale }: { locale: string }) {
  return (
    <div className="w-72 bg-gray-900 border-e border-gray-800 text-white min-h-screen p-6 flex flex-col shrink-0">
      <div className="text-2xl font-black mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Admin Control</div>
      
      <nav className="flex-1 space-y-2">
        <Link href={`/${locale}/admin`} className="flex gap-4 items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium">
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Link href={`/${locale}/admin/products`} className="flex gap-4 items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium">
          <ShoppingBag className="w-5 h-5" /> Manage Products
        </Link>
        <Link href={`/${locale}/admin/brands`} className="flex gap-4 items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium">
          <ImageIcon className="w-5 h-5" /> Manage Brands
        </Link>
        <div className="pt-6 mt-6 border-t border-gray-800">
          <Link href={`/${locale}`} className="flex gap-4 items-center px-4 py-3 text-secondary hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium">
            <Globe className="w-5 h-5" /> View Public Site
          </Link>
        </div>
      </nav>

      <form action={async () => {
        'use server';
        await signOut({ redirectTo: `/${locale}/login` });
      }}>
        <button type="submit" className="flex gap-4 items-center text-red-400 hover:text-white hover:bg-red-500/20 px-4 py-3 rounded-xl transition-all w-full mt-auto font-medium">
          <LogOut className="w-5 h-5" /> Terminate Session
        </button>
      </form>
    </div>
  );
}
