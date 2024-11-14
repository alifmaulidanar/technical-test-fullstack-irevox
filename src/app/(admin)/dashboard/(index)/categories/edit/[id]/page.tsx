import React from 'react'
import { Tedit } from '@/types'
import { redirect } from 'next/navigation'
import { getCategoryById } from '../../lib/data'
import FormCategory from '../../_components/form-category'

export default async function EditPage({ params }: Tedit) {
  const data = await getCategoryById(params.id)

  if (!data) {
    return redirect('/dashboard/categories')
  }

  return <FormCategory type="EDIT" data={data} />
}
