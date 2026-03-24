'use server';

import prisma from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth';
import { z } from 'zod';

// --- Auth Guard ---
async function requireAuth() {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized: You must be logged in to perform this action.');
  }
  return session;
}

// --- Zod Schemas ---
const productSchema = z.object({
  name_en: z.string().min(1, 'English name is required').max(200),
  name_ar: z.string().min(1, 'Arabic name is required').max(200),
  description_en: z.string().min(1, 'English description is required').max(5000),
  description_ar: z.string().min(1, 'Arabic description is required').max(5000),
  category: z.string().min(1, 'Category is required').max(100),
  imageUrl: z.string().max(5_000_000), // Base64 can be large
  isVisible: z.boolean(),
});

const brandSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required').max(200),
  logoUrl: z.string().max(5_000_000),
  isVisible: z.boolean(),
  orderIndex: z.number().int().min(0).max(9999),
});

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// --- Actions ---

export async function deleteProduct(id: string) {
  await requireAuth();
  await prisma.product.delete({ where: { id } });
  revalidatePath('/[locale]/admin/products', 'page');
  revalidatePath('/[locale]/products', 'page');
  revalidatePath('/[locale]', 'page');
}

export async function deleteBrand(id: string) {
  await requireAuth();
  await prisma.brandLogo.delete({ where: { id } });
  revalidatePath('/[locale]/admin/brands', 'page');
  revalidatePath('/[locale]', 'page');
}

export async function saveProduct(formData: FormData) {
  await requireAuth();

  const idValue = formData.get('id') as string;
  const id = idValue === 'new' ? null : idValue;
  
  let imageUrl = formData.get('imageUrl') as string;
  const imageFile = formData.get('imageFile') as File | null;
  
  // Convert file directly to base64
  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > MAX_IMAGE_SIZE) {
      throw new Error('Image file must be less than 5MB.');
    }
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = imageFile.type || 'image/jpeg';
    const base64Data = buffer.toString('base64');
    imageUrl = `data:${mimeType};base64,${base64Data}`;
  }

  const data = productSchema.parse({
    name_en: formData.get('name_en') as string,
    name_ar: formData.get('name_ar') as string,
    description_en: formData.get('description_en') as string,
    description_ar: formData.get('description_ar') as string,
    category: formData.get('category') as string,
    imageUrl: imageUrl,
    isVisible: formData.get('isVisible') === 'on',
  });

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }
  revalidatePath('/[locale]/admin/products', 'page');
  revalidatePath('/[locale]/products', 'page');
  revalidatePath('/[locale]', 'page');
}

export async function saveBrand(formData: FormData) {
  await requireAuth();

  const idValue = formData.get('id') as string;
  const id = idValue === 'new' ? null : idValue;
  
  let logoUrl = formData.get('logoUrl') as string;
  const logoFile = formData.get('logoFile') as File | null;

  // Convert the brand logo file directly to base64
  if (logoFile && logoFile.size > 0) {
    if (logoFile.size > MAX_IMAGE_SIZE) {
      throw new Error('Logo file must be less than 5MB.');
    }
    const bytes = await logoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = logoFile.type || 'image/png';
    const base64Data = buffer.toString('base64');
    logoUrl = `data:${mimeType};base64,${base64Data}`;
  }

  const data = brandSchema.parse({
    brandName: formData.get('brandName') as string,
    logoUrl: logoUrl,
    isVisible: formData.get('isVisible') === 'on',
    orderIndex: parseInt(formData.get('orderIndex') as string) || 0,
  });

  if (id) {
    await prisma.brandLogo.update({ where: { id }, data });
  } else {
    await prisma.brandLogo.create({ data });
  }
  revalidatePath('/[locale]/admin/brands', 'page');
  revalidatePath('/[locale]', 'page');
}
