import React from 'react'
import { Tedit } from '@/types'
import { redirect } from 'next/navigation'
import { getBrandById } from '../../lib/data'
import FormBrand from '../../_components/form-brand'

export default async function EditPage({ params }: Tedit) {
  const data = await getBrandById(params.id)

  if (!data) {
    return redirect('/dashboard/brands')
  }

  return <FormBrand type="EDIT" data={data} />
}
