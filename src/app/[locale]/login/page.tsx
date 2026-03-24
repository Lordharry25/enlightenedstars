'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
       setError(locale === 'ar' ? 'بيانات الاعتماد غير صالحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.' : 'Invalid credentials. Please check your email and password.');
       setLoading(false);
    } else {
       router.push(`/${locale}/admin`);
       router.refresh();
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
       <form 
         onSubmit={handleLogin} 
         className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
       >
         <div className="flex justify-center mb-6">
           <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
             <Lock className="w-8 h-8 text-primary" />
           </div>
         </div>
         <h1 className="text-3xl mb-2 font-black text-center text-gray-900">
           {locale === 'ar' ? 'تسجيل الدخول' : 'Admin Login'}
         </h1>
         <p className="text-center text-gray-500 mb-8 text-sm">
           {locale === 'ar' ? 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة الإدارة' : 'Enter your credentials to access the admin panel'}
         </p>

         {error && (
           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">
             {error}
           </div>
         )}
         
         <div className="mb-6">
           <label className="block text-sm font-semibold text-gray-700 mb-2">
             {locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
           </label>
           <input 
             name="email" 
             type="email" 
             placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
             className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 bg-gray-50 transition-colors" 
             required
           />
         </div>

         <div className="mb-8">
           <label className="block text-sm font-semibold text-gray-700 mb-2">
             {locale === 'ar' ? 'كلمة المرور' : 'Password'}
           </label>
           <input 
             name="password" 
             type="password" 
             placeholder={locale === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
             className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 bg-gray-50 transition-colors" 
             required
           />
         </div>

         <button 
           type="submit" 
           disabled={loading}
           className="w-full bg-primary hover:bg-blue-800 disabled:bg-blue-300 text-white font-bold p-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
         >
           {loading ? (
             <>
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               {locale === 'ar' ? 'جاري المصادقة...' : 'Authenticating...'}
             </>
           ) : (
             locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'
           )}
         </button>
       </form>
     </div>
  );
}
