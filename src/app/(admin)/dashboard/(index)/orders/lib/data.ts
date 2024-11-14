import { getImageUrl } from "@/lib/supabase"
import prisma from "../../../../../../../lib/prisma"
import { TColumn } from "../columns"

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true
          }
        },
      }
    })

    const response: TColumn[] = orders.map((order) => {
      return {
        id: order.id,
        customer_name: order.user.name,
        price: Number(order.total),
        products: order.products.map((item) => {
          return {
            name: item.product.name,
            image: getImageUrl(item.product.images[0]),
          }
        }),
        status: order.status,
      }
    })

    return response
  } catch (error) {
    console.error(error)
    return []
  }
}