import React from 'react'
import { Tedit } from '@/types'
import { redirect } from 'next/navigation'
import { getLocationById } from '../../lib/data'
import FormLocation from '../../_components/form-location'

export default async function EditPage({ params }: Tedit) {
  const data = await getLocationById(params.id)

  if (!data) {
    return redirect('/dashboard/locations')
  }

  return <FormLocation type="EDIT" data={data} />
}
