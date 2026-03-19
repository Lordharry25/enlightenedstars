'use server';

import prisma from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/[locale]/admin/products', 'page');
  revalidatePath('/[locale]/products', 'page');
  revalidatePath('/[locale]', 'page');
}

export async function deleteBrand(id: string) {
  await prisma.brandLogo.delete({ where: { id } });
  revalidatePath('/[locale]/admin/brands', 'page');
  revalidatePath('/[locale]', 'page');
}

export async function saveProduct(formData: FormData) {
  const idValue = formData.get('id') as string;
  const id = idValue === 'new' ? null : idValue;
  
  let imageUrl = formData.get('imageUrl') as string;
  const imageFile = formData.get('imageFile') as File | null;
  
  // Handing the raw multipart/form-data payload directly into public system
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const uploadPath = path.join(process.cwd(), 'public/products', filename);
    await fs.mkdir(path.join(process.cwd(), 'public/products'), { recursive: true });
    await fs.writeFile(uploadPath, buffer);
    imageUrl = `/products/${filename}`;
  }

  const data = {
    name_en: formData.get('name_en') as string,
    name_ar: formData.get('name_ar') as string,
    description_en: formData.get('description_en') as string,
    description_ar: formData.get('description_ar') as string,
    category: formData.get('category') as string,
    imageUrl: imageUrl,
    isVisible: formData.get('isVisible') === 'on',
  };

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
  const idValue = formData.get('id') as string;
  const id = idValue === 'new' ? null : idValue;
  
  let logoUrl = formData.get('logoUrl') as string;
  const logoFile = formData.get('logoFile') as File | null;

  // Save the brand logo file automatically
  if (logoFile && logoFile.size > 0) {
    const bytes = await logoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${logoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const uploadPath = path.join(process.cwd(), 'public/logos', filename);
    await fs.mkdir(path.join(process.cwd(), 'public/logos'), { recursive: true });
    await fs.writeFile(uploadPath, buffer);
    logoUrl = `/logos/${filename}`;
  }

  const data = {
    brandName: formData.get('brandName') as string,
    logoUrl: logoUrl,
    isVisible: formData.get('isVisible') === 'on',
    orderIndex: parseInt(formData.get('orderIndex') as string) || 0,
  };

  if (id) {
    await prisma.brandLogo.update({ where: { id }, data });
  } else {
    await prisma.brandLogo.create({ data });
  }
  revalidatePath('/[locale]/admin/brands', 'page');
  revalidatePath('/[locale]', 'page');
}
