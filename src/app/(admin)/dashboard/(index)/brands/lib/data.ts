import prisma from "../../../../../../../lib/prisma";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({});
    return brands;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBrandById(id: string) {
  try {
    const brand = await prisma.brand.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    return brand;
  } catch (error) {
    console.error(error);
    return null;
  }
}