"use server"

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import { schemaBrand } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../../lib/prisma";

export async function postBrand(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaBrand.safeParse({
    name: formData.get("name"),
    image: formData.get("image")
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message }
  }

  try {
    const fileName = await uploadFile(validate.data.image, "brands")

    await prisma.brand.create({
      data: {
        name: validate.data.name,
        logo: fileName
      }
    })
  } catch (error) {
    console.error(error)
    return { error: "Failed to create brand" }
  }

  return redirect("/dashboard/brands");
}

export async function updateBrand(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const fileUpload = formData.get("image") as File
  const validate = schemaBrand.pick({ name: true }).safeParse({
    name: formData.get("name")
  })

  if (!validate.success) {
    return { error: validate.error.errors[0].message }
  }

  if (!id || id === undefined) {
    return {
      error: "Brand not found"
    }
  }

  const brand = await prisma.brand.findFirst({
    where: {
      id
    },
    select: {
      logo: true
    }
  })

  let fileName = brand?.logo

  if (fileUpload.size > 0) {
    fileName = await uploadFile(fileUpload, "brands")
  }

  try {
    await prisma.brand.update({
      where: {
        id
      },
      data: {
        name: validate.data.name,
        logo: fileName
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to update brand"
    }
  }

  return redirect("/dashboard/brands");
}

export async function deleteBrand(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  try {
    const brand = await prisma.brand.findFirst({
      where: {
        id
      },
      select: {
        logo: true
      }
    })

    if (!brand) {
      return {
        error: "Brand not found"
      }
    }

    deleteFile(brand.logo, "brands")

    await prisma.brand.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to delete brand"
    }
  }

  return redirect("/dashboard/brands");
}