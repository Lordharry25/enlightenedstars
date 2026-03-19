import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '../../../components/AdminSidebar';

export default async function AdminLayout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {
  // Enforce authentication at the layout level
  const session = await auth();
  
  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar locale={locale} />
      <div className="flex-1 overflow-x-hidden">
        {/* We can remove Navbar/Footer implicitly because Next.js layouts nest.
            Since admin is inside [locale], it inherits [locale]/layout.tsx!
            Wait, we want a pure admin panel without the public Navbar?
            Next.js App Router allows Route Groups to bypass parent layouts, 
            e.g., (admin)/layout.tsx vs (public)/layout.tsx.
            If we are inside [locale]/layout.tsx, we will see the public Navbar.
            To override, we can just hide public navbar based on path or live with it for the demo, 
            but for a clean panel, the sidebar is enough. We'll render it inside the main block.
        */}
        <div className="p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[80vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
