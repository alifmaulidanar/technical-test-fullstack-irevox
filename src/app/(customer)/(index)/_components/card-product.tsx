import React from 'react'
import Link from 'next/link'
import { rupiahFormat } from '@/lib/utils'

type TProduct = {
  id: number
  name: string
  images_url: string
  category_name: string
  price: number
}

interface CardProductProps {
  product: TProduct
}

export default function CardProduct({ product }: CardProductProps) {
  return (
    <Link href="#" className="product-card">
      <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
        <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
          <img src={product.images_url} className="w-full h-full object-contain" alt="thumbnail" />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-1">
            <p className="font-semibold leading-[22px]">{product.name}</p>
            <p className="text-sm text-[#616369]">{product.category_name}</p>
          </div>
          <p className="font-semibold text-[#0D5CD7] leading-[22px]">{rupiahFormat(Number(product.price))}</p>
        </div>
      </div>
    </Link>
  )
}
