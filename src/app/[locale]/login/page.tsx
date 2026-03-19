'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // We utilize the NextAuth client-side signIn for immediate feedback
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
       alert("Invalid credentials! Please check your email and password.");
       setLoading(false);
    } else {
       // Force a router refresh to update session state in the layout boundary and navigate
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
         <h1 className="text-3xl mb-8 font-black text-center text-gray-900">Admin Secure Login</h1>
         
         <div className="mb-6">
           <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
           <input 
             name="email" 
             type="email" 
             defaultValue="admin@example.com" 
             className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 bg-gray-50 transition-colors" 
             required
           />
         </div>

         <div className="mb-8">
           <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
           <input 
             name="password" 
             type="password" 
             defaultValue="admin123" 
             className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 bg-gray-50 transition-colors" 
             required
           />
         </div>

         <button 
           type="submit" 
           disabled={loading}
           className="w-full bg-primary hover:bg-blue-800 disabled:bg-blue-300 text-white font-bold p-4 rounded-xl transition-all shadow-md hover:shadow-lg transform disabled:hover:translate-y-0"
         >
           {loading ? 'Authenticating...' : 'Authenticate Session'}
         </button>

         <p className="mt-6 text-center text-sm text-gray-500">
           Use <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">admin@example.com</span> / <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">admin123</span>
         </p>
       </form>
     </div>
  );
}
