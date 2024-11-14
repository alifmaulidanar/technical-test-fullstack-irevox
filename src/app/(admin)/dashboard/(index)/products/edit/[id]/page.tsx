import React from 'react'
import { Tedit } from '@/types'
import { Label } from '@/components/ui/label'
import { getProductById } from '../../lib/data'
import { getBrands } from '../../../brands/lib/data'
import FormProduct from '../../_components/form-product'
import { getLocations } from '../../../locations/lib/data'
import { getCategories } from '../../../categories/lib/data'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { redirect } from 'next/navigation'

export default async function EditProduct({ params }: Tedit) {
  const product = await getProductById(Number(params.id))
  const brands = await getBrands()
  const categories = await getCategories()
  const locations = await getLocations()

  if (!product) {
    return redirect('/dashboard/products')
  }

  return (
    <FormProduct type='EDIT' data={product}>
      <div className="grid gap-3">
        <Label htmlFor="category">Category</Label>
        <Select name='category_id' defaultValue={product.category_id.toString()}>
          <SelectTrigger
            id="category"
            aria-label="Select category"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={`${category.id}`}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="brand">
          Brand
        </Label>
        <Select name='brand_id' defaultValue={product.brand_id.toString()}>
          <SelectTrigger
            id="brand"
            aria-label="Select brand"
          >
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={`${brand.id}`}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="location">
          Location
        </Label>
        <Select name='location_id' defaultValue={product.location_id.toString()}>
          <SelectTrigger
            id="location"
            aria-label="Select location"
          >
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((location) => (
              <SelectItem key={location.id} value={`${location.id}`}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormProduct>
  )
}
