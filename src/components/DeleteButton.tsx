'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export default function DeleteButton({ action, itemName }: { action: () => Promise<void>, itemName: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      await action();
    });
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
    >
      {isPending ? (
        <div className="w-5 h-5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </button>
  );
}
