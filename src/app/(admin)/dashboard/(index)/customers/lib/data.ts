import { TColumn } from "../columns"
import prisma from "../../../../../../../lib/prisma"

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: 'customer'
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    })

    const response: TColumn[] = customers.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        total_transactions: customer._count.orders,
      }
    })

    return response
  } catch (error) {
    console.error(error)
    return []
  }
}