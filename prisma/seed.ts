import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Brands...');
  await prisma.brandLogo.createMany({
    data: [
      { brandName: 'Nestle Wholesale', logoUrl: '/logos/nestle.png', orderIndex: 1 },
      { brandName: 'Unilever Dist', logoUrl: '/logos/unilever.png', orderIndex: 2 },
      { brandName: 'P&G Supplies', logoUrl: '/logos/pg.png', orderIndex: 3 },
      { brandName: 'Coca-Cola B2B', logoUrl: '/logos/coke.png', orderIndex: 4 },
      { brandName: 'PepsiCo Trading', logoUrl: '/logos/pepsico.png', orderIndex: 5 },
    ]
  });

  console.log('Seeding Products...');
  await prisma.product.createMany({
    data: [
      {
        name_en: 'Premium Instant Coffee 500g',
        name_ar: 'قهوة سريعة التحضير ممتازة 500 جم',
        description_en: 'High-quality spray-dried instant coffee. Shelf life: 24 months. Packaging: Glass Jar. Ideal for quick commerce distribution and office pantry supplies.',
        description_ar: 'قهوة سريعة التحضير عالية الجودة المجففة بالرذاذ. مدة الصلاحية: 24 شهرًا. التعبئة: وعاء زجاجي. مثالية للتوزيع السريع.',
        category: 'Beverages',
        imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Whole Wheat Pasta 5kg',
        name_ar: 'مكرونة قمح كامل 5 كجم',
        description_en: 'Bulk packaged whole wheat penne pasta. Shelf life: 18 months. High protein content suitable for HORECA and retail FMCG distribution.',
        description_ar: 'مكرونة بيني من القمح الكامل معبأة بالجملة. مدة الصلاحية: 18 شهرًا. محتوى عالي من البروتين مناسب لقطاع الفنادق والمطاعم والمقاهي والتجزئة.',
        category: 'Pantry',
        imageUrl: 'https://images.unsplash.com/photo-1621996316564-42f1f0088566?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Organic Extra Virgin Olive Oil 5L',
        name_ar: 'زيت زيتون بكر ممتاز عضوي 5 لتر',
        description_en: 'Cold-pressed extra virgin olive oil. Tin packaging for extended shelf life of 24 months. Pallet quantity: 150 tins.',
        description_ar: 'زيت زيتون بكر ممتاز معصور على البارد. عبوة صفيح لإطالة مدة الصلاحية حتى 24 شهرًا. كمية البليت: 150 عبوة.',
        category: 'Oils & Condiments',
        imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Almond Milk Unsweetened 1L (Case of 12)',
        name_ar: 'حليب اللوز غير المحلى 1 لتر (كرتونة 12 صنف)',
        description_en: 'UHT Almond milk carton. Shelf life: 12 months ambient. High demand in dark stores for quick delivery. 12x1L per case.',
        description_ar: 'كرتونة حليب لوز طويل الأجل. مدة الصلاحية: 12 شهرًا في درجة حرارة الغرفة. 12×1 لتر لكل كرتونة.',
        category: 'Dairy Alternatives',
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Baby Diapers Size 4 (Jumbo Pack - 80pcs)',
        name_ar: 'حفاضات أطفال مقاس 4 (عبوة جامبو - 80 قطعة)',
        description_en: 'Ultra-absorbent baby diapers. Bale contains 4 packs. Shelf life: 36 months. Top moving category in rapid delivery.',
        description_ar: 'حفاضات أطفال فائقة الامتصاص. تحتوي الرزمة على 4 عبوات. مدة الصلاحية: 36 شهرًا.',
        category: 'Personal Care',
        imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Laundry Detergent Pods (Pack of 45)',
        name_ar: 'كبسولات منظف غسيل (عبوة 45)',
        description_en: 'Concentrated 3-in-1 laundry capsules. Packaging: Child-lock tub. Case of 6 tubs. High retention FMCG item.',
        description_ar: 'كبسولات غسيل مركزة 3 في 1. التعبئة والتغليف: حوض محكم الغلق. كرتونة من 6 أحواض.',
        category: 'Home Care',
        imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Basmati Rice Premium 10kg',
        name_ar: 'أرز بسمتي ممتاز 10 كجم',
        description_en: 'Long grain XXL Basmati rice. Jute bag packaging. Shelf life: 24 months. Sourced directly from farms.',
        description_ar: 'أرز بسمتي طويل الحبة. تعبئة أكياس خيش. مدة الصلاحية: 24 شهرًا. مصدره المزارع مباشرة.',
        category: 'Pantry',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Tomato Ketchup 5kg Jerry Can',
        name_ar: 'كاتشب طماطم 5 كجم جركن',
        description_en: 'Thick Grade A tomato ketchup. HORECA pack. Shelf life: 12 months. Packed in secure jerry cans.',
        description_ar: 'كاتشب طماطم سميك من الدرجة الأولى. عبوة للمطاعم. مدة الصلاحية: 12 شهرًا.',
        category: 'Condiments',
        imageUrl: 'https://images.unsplash.com/photo-1607305922338-bb451f2803b0?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Bottled Mineral Water 500ml (Case of 24)',
        name_ar: 'مياه معدنية معبأة 500 مل (كرتونة 24)',
        description_en: 'Natural mineral water in PET bottles. Fast-moving consumer good. Shelf life: 12 months. Essential for dark store stock.',
        description_ar: 'مياه معدنية طبيعية في عبوات بلاستيكية. سلعة استهلاكية سريعة التداول. مدة الصلاحية: 12 شهرًا.',
        category: 'Beverages',
        imageUrl: 'https://images.unsplash.com/photo-1523362628487-79b8823f95f4?q=80&w=800&auto=format&fit=crop'
      },
      {
        name_en: 'Dark Chocolate Bar 70% Cacao 100g (Box of 20)',
        name_ar: 'لوح شوكولاتة داكنة 70٪ كاكاو 100 جم (صندوق من 20)',
        description_en: 'Premium dark chocolate bars. Temperature controlled logistics required. Shelf life: 12 months.',
        description_ar: 'ألواح شوكولاتة داكنة ممتازة. يتطلب لوجستيات يتم التحكم في درجة حرارتها. مدة الصلاحية: 12 شهرًا.',
        category: 'Snacks & Confectionery',
        imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop'
      }
    ]
  });
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
