import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    })
    return categories
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        images: true,
        category: {
          select: {
            name: true
          }
        },
        price: true,
      }
    })

    const response = products.map((product) => {
      return {
        ...product,
        images_url: getImageUrl(product.images[0], "products")
      }
    })

    return response
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        logo: true
      }
    })

    const response = brands.map((brand) => {
      return {
        ...brand,
        logo_url: getImageUrl(brand.logo, "brands")
      }
    })
    return response
  } catch (error) {
    console.error(error)
    return []
  }
}