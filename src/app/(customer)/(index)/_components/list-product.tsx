import Link from 'next/link'
import React, { ReactNode } from 'react'
import { getProducts } from '../lib/data'
import CardProduct from './card-product'

interface ListProductProps {
  title: ReactNode
}

export default async function ListProduct({ title }: ListProductProps) {
  const products = await getProducts()

  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">{title}</h2>
        <Link href="#" className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold">Explore All</Link>
      </div>
      <div className="grid grid-cols-5 gap-[30px] text-black">
        {products.map((product) => (
          <CardProduct key={`${product.id} + ${product.name}`} product={{
            id: product.id,
            name: product.name,
            images_url: product.images_url,
            category_name: product.category.name,
            price: Number(product.price)
          }} />
        ))}
      </div>
    </div>
  )
}
