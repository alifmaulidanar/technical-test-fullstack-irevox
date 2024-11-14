"use server"

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import { schemaCategory } from "@/lib/schema";
import prisma from "../../../../../../../lib/prisma";

export async function postCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name")
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message }
  }

  try {
    await prisma.category.create({
      data: {
        name: validate.data.name
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to create category"
    }
  }

  return redirect("/dashboard/categories");
}

export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name")
  });

  if (!validate.success) {
    return { error: validate.error.errors[0].message }
  }

  if (!id || id === undefined) {
    return {
      error: "Category not found"
    }
  }

  try {
    await prisma.category.update({
      where: {
        id
      },
      data: {
        name: validate.data.name
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to update category"
    }
  }

  return redirect("/dashboard/categories");
}

export async function deleteCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  if (!id || id === undefined) {
    return {
      error: "Category not found"
    }
  }

  try {
    await prisma.category.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to delete category"
    }
  }

  return redirect("/dashboard/categories");
}