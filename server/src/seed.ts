import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin
  const adminEmail = "admin@bcscoffeemarket.com";
  const adminPassword = "admin123"; // Change in production!

  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashed,
        name: "BCS Admin",
        role: "admin",
      },
    });
    console.log(`✅ Admin created: ${adminEmail} / ${adminPassword}`);
    console.log("⚠️  Change the default password in production!");
  } else {
    console.log("ℹ️  Admin already exists, skipping");
  }

  // Create sample coffee commodities
  const sampleCommodities = [
    {
      name: "Yirgacheffe Washed Grade 1",
      organicCertified: true,
      sourceOfCoffee: "Commercial",
      coffeeGrade: "1",
      coffeeType: "Yirgacheffe",
      coffeeStatus: "Green Bean",
      processingType: "Washed",
      packagingContent: "GrainPro lined bags",
      packageUnit: "60kg bags",
      weightUnitCode: "KG",
      pricePerUnit: 480,
      stockQuantity: 200,
      availableQty: 180,
      quantitySold: 20,
      minOrderQty: 1,
      description: "Premium Yirgacheffe washed Grade 1, floral and citrus notes.",
    },
    {
      name: "Sidama Natural Grade 2",
      organicCertified: false,
      sourceOfCoffee: "Grower",
      coffeeGrade: "2",
      coffeeType: "Sidama",
      coffeeStatus: "Green Bean",
      processingType: "Unwashed",
      packagingContent: "Burlap bags",
      packageUnit: "60kg bags",
      weightUnitCode: "KG",
      pricePerUnit: 380,
      stockQuantity: 500,
      availableQty: 450,
      quantitySold: 50,
      minOrderQty: 5,
      description: "Sidama natural process, berry and wine notes.",
    },
    {
      name: "Harrar Longberry Grade 4",
      organicCertified: false,
      sourceOfCoffee: "Farmer",
      coffeeGrade: "4",
      coffeeType: "Harrar",
      coffeeStatus: "Roast and Grind",
      processingType: "Unwashed",
      packagingContent: "Burlap bags",
      packageUnit: "60kg bags",
      weightUnitCode: "KG",
      pricePerUnit: 320,
      stockQuantity: 0,
      availableQty: 0,
      quantitySold: 100,
      minOrderQty: 10,
      description: "Classic Harrar longberry, blueberry and wine character.",
    },
    {
      name: "Guji Washed Grade 1",
      organicCertified: true,
      sourceOfCoffee: "Vertical",
      coffeeGrade: "1",
      coffeeType: "Guji",
      coffeeStatus: "Green Bean",
      processingType: "Washed",
      packagingContent: "GrainPro lined bags",
      packageUnit: "60kg bags",
      weightUnitCode: "KG",
      pricePerUnit: 520,
      stockQuantity: 100,
      availableQty: 100,
      quantitySold: 0,
      minOrderQty: 1,
      description: "Exceptional Guji washed Grade 1, jasmine and chocolate.",
    },
  ];

  const existingCount = await prisma.coffeeCommodity.count();
  if (existingCount === 0) {
    for (const data of sampleCommodities) {
      await prisma.coffeeCommodity.create({ data });
    }
    console.log(`✅ ${sampleCommodities.length} sample commodities created`);
  } else {
    console.log("ℹ️  Commodities already exist, skipping");
  }

  // Create default site settings
  const defaultSettings = [
    { key: "site.name", value: "BCS Coffee Market Consulting" },
    { key: "site.email", value: "info@bcscoffeemarket.com" },
    { key: "site.phone", value: "+251-973-053-737" },
    { key: "site.whatsapp", value: "+251-951-626-242" },
    { key: "social.telegram", value: "" },
    { key: "social.linkedin", value: "" },
    { key: "social.instagram", value: "" },
    { key: "social.facebook", value: "" },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log("✅ Default site settings created");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
