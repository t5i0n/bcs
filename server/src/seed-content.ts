import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Only non-translatable DATA entries are stored in the CMS.
// All text content is handled by i18n translations (src/i18n/).
const contentEntries = [
  // Stats numbers (data, not translatable)
  { key: 'home.stats.years', value: '15+', section: 'home' },
  { key: 'home.stats.exporters', value: '100+', section: 'home' },
  { key: 'home.stats.countries', value: '40+', section: 'home' },
  { key: 'home.stats.trade', value: '$50M+', section: 'home' },

  // Contact info (data, not translatable)
  { key: 'home.contact.headquarters', value: 'Jemo Around Africa Building, Ethiopia', section: 'home' },
  { key: 'home.contact.phone1', value: '+251-973-053-737', section: 'home' },
  { key: 'home.contact.phone2', value: '+251-951-626-242', section: 'home' },
  { key: 'home.contact.email', value: 'info@bcscoffee.et', section: 'home' },

  // Timeline years (data, not translatable)
  { key: 'home.timeline.2009.year', value: '2009', section: 'home' },
  { key: 'home.timeline.2014.year', value: '2014', section: 'home' },
  { key: 'home.timeline.2019.year', value: '2019', section: 'home' },
  { key: 'home.timeline.2024.year', value: '2024', section: 'home' },

  // Altitude / Processing / Harvest values (data, not translatable)
  { key: 'origins.yirgacheffe.altitude', value: '1,800–2,200m', section: 'origins' },
  { key: 'origins.yirgacheffe.processing', value: 'Washed, Natural', section: 'origins' },
  { key: 'origins.yirgacheffe.harvest', value: 'Oct – Jan', section: 'origins' },
];

async function seedContent() {
  console.log('🌱 Seeding site content...');
  
  for (const entry of contentEntries) {
    await prisma.siteContent.upsert({
      where: { key: entry.key },
      update: { value: entry.value, section: entry.section },
      create: entry,
    });
  }
  
  console.log(`✅ Seeded ${contentEntries.length} content entries`);
}

seedContent()
  .catch((e) => {
    console.error('❌ Error seeding content:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
